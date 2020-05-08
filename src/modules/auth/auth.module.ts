import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { SigninComponent } from './components/signin/signin.component';
import { IsAuthenticatedGuard } from './guards/is-authenticated.guard';



@NgModule({
  declarations: [
    SigninComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule
  ],
  providers: [
    IsAuthenticatedGuard
  ]
})
export class AuthModule { }
