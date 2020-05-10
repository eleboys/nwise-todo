import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { SigninComponent } from "./components/signin/signin.component";
import { IsUnAuthenticatedGuard } from './guards/is-un-authenticated.guard';

const routes: Routes = [
  {
    path: "signin",
    component: SigninComponent,
    canActivate: [ IsUnAuthenticatedGuard ],
    data: { showHeader: false, showFooter: false }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
