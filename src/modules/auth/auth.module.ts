import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { SigninComponent } from './components/signin/signin.component';
import { IsAuthenticatedGuard } from './guards/is-authenticated.guard';
import { AuthService } from './services/auth.service';
import { SharedModule } from '../shared/shared.module';
import { IsUnAuthenticatedGuard } from './guards/is-un-authenticated.guard';
import { AuthStore } from './services/auth.store';
import { AuthLocalStorageService } from './services/auth-local-storage.service';



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
    AuthLocalStorageService,
    AuthService,
    AuthStore
  ],
  exports: [
  ]
})
export class AuthModule { }
