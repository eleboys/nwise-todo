import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexComponent } from './components/index/index.component';
import { IsAuthenticatedGuard } from '../auth/guards/is-authenticated.guard';

const routes: Routes = [
  {
    path: "",
    component: IndexComponent,
    canActivate: [ IsAuthenticatedGuard ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
