import { Injectable } from '@angular/core';
import { TodoStore } from './todo-store';
import { Guid } from 'guid-typescript';
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable, throwError, Subject, from } from 'rxjs';

import { Todo } from '../models/todo.model';
import { LocalStorageService } from 'src/modules/shared/services/local-storage.service';
import { AuthenticationService } from 'src/modules/auth/services/authentication.service';

import { AppService } from 'src/modules/app/services/app.service';
import { MenuItem } from 'src/modules/app/models/menu-item.model';

@Injectable()
export class TodoService {
  constructor(private todoStore: TodoStore,
              private appService: AppService,
              private authService: AuthenticationService,
              private lsService: LocalStorageService,
              private fireStore: AngularFirestore) {

    const item = new MenuItem();
    item.title = "Syncronize Data";
    item.moduleName = "todo";
    item.click = this.syncTodos.bind(this);
    this.appService.addDropDownMenuItem(item);
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

  syncTodos(): Observable<void> {
    if (!this.authService.isAuthenticated()) {
      return throwError("User must signin to sync data!");
    }

    const todos = this.todoStore.get("todos");
    const user = this.authService.getCurrentUser();
    const promise = this.fireStore.collection("users").doc(user.id).set({
      todos
    });

    return from(promise);
  }
}
