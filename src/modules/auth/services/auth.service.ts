import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, from } from 'rxjs';
import * as firebase from "firebase";

import { User } from '../models/user.model';
import { AuthStore } from './auth.store';
import { map, skip, distinctUntilChanged } from 'rxjs/operators';

@Injectable()
export class AuthService {

  constructor(private fireAuth: AngularFireAuth,
              private authStore: AuthStore) {
    this.subscribeToAuthStateChange();
  }

  getCurrentUser(): User {
    return this.authStore.get("currentUser");
  }

  isAuthenticated(): boolean {
    return this.authStore.get("isAuthenticated");
  }

  signInEmailPassword(email: string, password: string): Observable<User> {
    const promise = new Promise<firebase.auth.UserCredential>((resolve, reject) => {
      this.fireAuth.auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {
        this.fireAuth.auth.signInWithEmailAndPassword(email, password).then(resolve).catch(reject);
      }).catch(reject);
    });

    return from(promise).pipe(
      map(c => this.firebaseAuthToUserModel(c.user))
    );
  }

  signInWithGoogle(): Observable<User> {
    const provider = new firebase.auth.GoogleAuthProvider();
    const promise = new Promise<firebase.auth.UserCredential>((resolve, reject) => {
      this.fireAuth.auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {
        this.fireAuth.auth.signInWithPopup(provider).then(resolve).catch(reject);
      }).catch(reject);
    });

    return from(promise).pipe(
      map(c => this.firebaseAuthToUserModel(c.user))
    );
  }

  signOut(): Observable<void> {
    return from(this.fireAuth.auth.signOut());
  }

  private firebaseAuthToUserModel(u: firebase.User) {
    const user = new User();
    user.id = u.uid;
    user.email = u.email;
    user.displayName = u.displayName;
    user.avatarUrl = u.photoURL;
    return user;
  }

  private subscribeToAuthStateChange() {
    this.fireAuth.authState
    .pipe(
      distinctUntilChanged()
    )
    .subscribe((fuser) => {
      if (fuser) {
        const user = this.firebaseAuthToUserModel(fuser);
        this.authStore.set("currentUser", user);
        this.authStore.set("isAuthenticated", true);
      } else {
        this.authStore.set("currentUser", null);
        this.authStore.set("isAuthenticated", false);
      }
    }, (err) => {
      this.authStore.set("currentUser", null);
      this.authStore.set("isAuthenticated", false);
    });
  }
}
