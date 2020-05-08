import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirebaseService } from './services/firebase.service';



@NgModule({
  declarations: [],
  providers: [
    FirebaseService
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FirebaseService
  ]
})
export class SharedModule { }
