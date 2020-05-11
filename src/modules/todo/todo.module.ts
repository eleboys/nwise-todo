import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { TodoRoutingModule } from './todo-routing.module';
import { TodoComponent } from './components/todo/todo.component';
import { SharedModule } from '../shared/shared.module';
import { TodoStore } from './services/todo-store';
import { TodoService } from './services/todo.service';
import { AuthModule } from '../auth/auth.module';
import { AppModule } from '../app/app.module';


@NgModule({
  declarations: [
    TodoComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    AuthModule,
    FormsModule,
    TodoRoutingModule,
  ],
  providers: [
    TodoStore,
    TodoService
  ]
})
export class TodoModule { }
