import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { AuthModule } from '../auth/auth.module';
import { environment } from "../../environments/environment";
import { HeaderComponent } from './components/header/header.component';
import { TodoModule } from '../todo/todo.module';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { SharedModule } from '../shared/shared.module';
import { AppStore } from './services/app-store';
import { AppService } from './services/app.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    RouterModule.forRoot([]),
    AppRoutingModule,
    SharedModule,
    AuthModule,
    TodoModule
  ],
  providers: [
    AppStore,
    AppService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
