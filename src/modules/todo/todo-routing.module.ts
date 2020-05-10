import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";

import { TodoComponent } from "./components/todo/todo.component";

const routes: Routes = [
  { path: "", redirectTo: "todo", pathMatch: "full" },
  {
    path: "todo",
    children: [
      {
        path: "",
        component: TodoComponent,
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TodoRoutingModule {}
