import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { TodoComponent } from './todo/todo.component';

const routes: Routes = [
    {
      path: "todo",
      component: TodoComponent,
    },
  ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TodoRoutingModule { }
