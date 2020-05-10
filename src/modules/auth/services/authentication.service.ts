import { Injectable } from '@angular/core';

import { FirebaseService } from 'src/modules/shared/shared/services/firebase.service';
import { Observable } from 'rxjs';

import { User } from '../models/user.model';

@Injectable()
export class AuthenticationService {

  isAuthenticated$: Observable<boolean>;
  currentUser$: Observable<User>;

  constructor(private firebaseService: FirebaseService) {
    this.isAuthenticated$ = firebaseService.isAuthenticated$;
    this.currentUser$ = firebaseService.currentUser$;
  }

  isAuthenticated(): boolean {
    return this.firebaseService.isAuthenticated();
  }

  signInEmailPassword(email: string, password: string): Observable<User> {
    return this.firebaseService.signInEmailPassword(email, password);
  }

  signInWithGoogle(): Observable<User> {
    return this.firebaseService.signInWithGoogle();
  }

  signOut(): Observable<void> {
    return this.firebaseService.signOut();
  }
}
