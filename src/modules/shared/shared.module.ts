import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FirebaseService } from './services/firebase.service';
import { LocalStorageService } from './services/local-storage.service';
import { VarDirective } from './directives/var.directive';



@NgModule({
  declarations: [
    VarDirective
  ],
  providers: [
    FirebaseService,
    LocalStorageService
  ],
  imports: [
    CommonModule
  ],
  exports: [
    VarDirective
  ]
})
export class SharedModule { }
