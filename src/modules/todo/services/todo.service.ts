import { Injectable } from '@angular/core';
import { TodoStore } from './todo-store';
import { Guid } from 'guid-typescript';
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable, throwError, Subject, from } from 'rxjs';

import { Todo } from '../models/todo.model';
import { AuthService } from 'src/modules/auth/services/auth.service';
import { AppService } from 'src/modules/app/services/app.service';
import { MenuItem } from 'src/modules/app/models/menu-item.model';
import { AuthLocalStorageService } from 'src/modules/auth/services/auth-local-storage.service';
import { AuthStore } from 'src/modules/auth/services/auth.store';
import { distinctUntilChanged, skip } from 'rxjs/operators';

@Injectable()
export class TodoService {

  constructor(private todoStore: TodoStore,
              private appService: AppService,
              private authService: AuthService,
              private authStore: AuthStore,
              private lsService: AuthLocalStorageService,
              private fireStore: AngularFirestore) {

    this.injectModuleMenuItems();
    this.subscribeToAuthState();
  }

  private injectModuleMenuItems() {
    const item = new MenuItem();
    item.title = "Syncronize Data";
    item.moduleName = "todo";
    item.click = () => {
      this.syncTodos();
    };
    this.appService.addDropDownMenuItem(item);
  }

  subscribeToAuthState() {
    this.authStore.select("currentUser")
                  .pipe(
                    skip(1)
                  )
                  .subscribe(() => { this.reloadTodoStore(); });
  }

  addNewTodo(title: string) {
    const todos = this.todoStore.get("todos") as Todo[];
    const todo = new Todo();
    todo.id = Guid.create().toString();
    todo.title = title;
    todos.push(todo);
    this.todoStore.set("todos", todos);
    this.lsService.set("todos", todos);
  }

  updateTodo(todo: Todo) {
    const todos = this.todoStore.get("todos") as Todo[];
    const index = todos.findIndex(t => t.id === todo.id);
    if (index < 0) {
      return;
    }
    todos[index] = todo;
    this.todoStore.set("todos", todos);
    this.lsService.set("todos", todos);
  }

  deleteTodo(todo: Todo) {
    const todos = this.todoStore.get("todos") as Todo[];
    const index = todos.findIndex(t => t.id === todo.id);
    if (index < 0) {
      return;
    }
    todos.splice(index, 1);
    this.todoStore.set("todos", todos);
    this.lsService.set("todos", todos);
  }

  reloadTodoStore() {
    console.log("reloading");
    const todos = this.lsService.get("todos") || [];
    this.todoStore.set("todos", todos);
  }

  syncTodos(): Observable<void> {
    if (!this.authService.isAuthenticated()) {
      return throwError("User must signin to sync data!");
    }

    const todos = this.todoStore.get("todos");
    const user = this.authService.getCurrentUser();
    const promise = this.fireStore.collection("users").doc(user.id).set({
      todos: JSON.parse(JSON.stringify(todos))
    });

    return from(promise);
  }
}
