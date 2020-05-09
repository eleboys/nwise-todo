import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";

import { FirebaseService } from './services/firebase.service';
import { LocalStorageService } from './services/local-storage.service';



@NgModule({
  declarations: [],
  providers: [
    FirebaseService,
    LocalStorageService
  ],
  imports: [
    CommonModule
  ],
  exports: [
  ]
})
export class SharedModule { }
