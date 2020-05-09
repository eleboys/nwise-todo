import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { SigninComponent } from './components/signin/signin.component';
import { IsAuthenticatedGuard } from './guards/is-authenticated.guard';
import { AuthenticationService } from './services/authentication.service';
import { SharedModule } from '../shared/shared/shared.module';
import { IsUnAuthenticatedGuard } from './guards/is-un-authenticated.guard';



@NgModule({
  declarations: [
    SigninComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    AuthRoutingModule
  ],
  providers: [
    IsAuthenticatedGuard,
    IsUnAuthenticatedGuard,
    AuthenticationService
  ],
  exports: [
  ]
})
export class AuthModule { }
