import { Injectable } from '@angular/core';
import { TodoStore } from './todo-store';
import { Guid } from 'guid-typescript';
import { AngularFirestore } from "@angular/fire/firestore";

import { Todo } from '../models/todo.model';
import { LocalStorageService } from 'src/modules/shared/services/local-storage.service';
import { AuthenticationStore } from 'src/modules/auth/services/authentication.store';
import { AuthenticationService } from 'src/modules/auth/services/authentication.service';
import { Observable, throwError, Subject, from } from 'rxjs';

@Injectable()
export class TodoService {
  constructor(private todoStore: TodoStore,
              private authService: AuthenticationService,
              private lsService: LocalStorageService,
              private fireStore: AngularFirestore) { }

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
