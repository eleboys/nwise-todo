import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Guid } from "guid-typescript";

import { TodoStore } from '../../services/todo-store';
import { Todo } from '../../models/todo.model';
import { Observable } from 'rxjs';
import { TodoService } from '../../services/todo.service';
import { takeUntil } from 'rxjs/operators';
import { ComponentBase } from "../../../shared/models/component-base";

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent extends ComponentBase implements OnInit {

  todoForm: FormGroup;
  todos$: Observable<Todo[]>;

  constructor(private todoStore: TodoStore,
              private todoService: TodoService) {
    super();
    this.todos$ = todoStore.select("todos");
  }

  ngOnInit() {
    this.initTodoFormFields();
  }

  onSubmit() {
    this.todoService.addNewTodo(this.todoForm.value.title);
    this.todoForm.controls.title.setValue("");
  }

  onSync() {
    this.todoService.syncTodos().pipe(
      takeUntil(this.unsubscribe)
    ).subscribe({
      next: () => console.log("done"),
      error: (er) => console.log(er)
    });
  }

  todoUpdated(todo: Todo, val: boolean) {
    todo.isDone = val;
    this.todoService.updateTodo(todo);
  }

  private initTodoFormFields() {
    this.todoForm = new FormGroup({
      title: new FormControl("", [ Validators.required ])
    });
  }

}
