import { Injectable } from '@angular/core';
import { Observable, from, BehaviorSubject, Subject } from 'rxjs';
import { map } from "rxjs/operators";
import * as firebase from "firebase";
import { AngularFireAuth,  } from "@angular/fire/auth";

@Injectable()
export class FirebaseService {

  private currentUser: string;
  isAuthenticated$: Observable<boolean>;

  constructor(private fireAuth: AngularFireAuth) {
    this.subscribeToAuthStateChange(fireAuth);
  }

  isAuthenticated(): boolean {
    return this.currentUser != null;
  }

  signInEmailPassword(email: string, password: string): Observable<string> {
    const promise = new Promise<firebase.auth.UserCredential>((resolve, reject) => {
      this.fireAuth.auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {
        this.fireAuth.auth.signInWithEmailAndPassword(email, password).then(resolve).catch(reject);
      }).catch(reject);
    });

    return from(promise).pipe(
      map(u => u.user.displayName)
    );
  }

  signInWithGoogle(): Observable<string> {
    const provider = new firebase.auth.GoogleAuthProvider();
    const promise = new Promise<firebase.auth.UserCredential>((resolve, reject) => {
      this.fireAuth.auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {
        this.fireAuth.auth.signInWithPopup(provider).then(resolve).catch(reject);
      }).catch(reject);
    });

    return from(promise).pipe(
      map(u => u.user.displayName)
    );
  }

  signOut(): Observable<void> {
    return from(this.fireAuth.auth.signOut());
  }

  private subscribeToAuthStateChange(fireAuth: AngularFireAuth) {
    this.isAuthenticated$ = fireAuth.authState.pipe(map(u => u !== null));

    fireAuth.authState.subscribe((user) => {
      this.currentUser = user !== null ? user.email : null;
      console.log(this.currentUser);
    }, (err) => {
      this.currentUser = null;
    });
  }
}
