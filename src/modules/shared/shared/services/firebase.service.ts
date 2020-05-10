import { Injectable } from '@angular/core';
import { Observable, from, BehaviorSubject, Subject } from 'rxjs';
import { map } from "rxjs/operators";
import * as firebase from "firebase";
import { AngularFireAuth,  } from "@angular/fire/auth";
import { User } from 'src/modules/auth/models/user.model';

@Injectable()
export class FirebaseService {

  private currentUser: string;
  currentUser$: Observable<User>;
  isAuthenticated$: Observable<boolean>;

  constructor(private fireAuth: AngularFireAuth) {
    this.subscribeToAuthStateChange(fireAuth);
  }

  isAuthenticated(): boolean {
    return this.currentUser != null;
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

  private subscribeToAuthStateChange(fireAuth: AngularFireAuth) {
    this.isAuthenticated$ = fireAuth.authState.pipe(map(u => u !== null));

    fireAuth.authState.subscribe((user) => {
      this.currentUser = user !== null ? user.email : null;
    }, (err) => {
      this.currentUser = null;
    });

    this.currentUser$ = fireAuth.authState.pipe(
      map((user) => {
        if (user) {
          return this.firebaseAuthToUserModel(user);
        }
        return null;
      })
    );
  }
}
