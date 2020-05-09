import { Injectable } from '@angular/core';

import { FirebaseService } from 'src/modules/shared/shared/services/firebase.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class AuthenticationService {

  isAuthenticated$: Observable<boolean>;

  constructor(private firebaseService: FirebaseService) {
    this.isAuthenticated$ = firebaseService.isAuthenticated$;
  }

  isAuthenticated(): boolean {
    return this.firebaseService.isAuthenticated();
  }

  signInEmailPassword(email: string, password: string): Observable<string> {
    return this.firebaseService.signInEmailPassword(email, password);
  }

  signInWithGoogle(): Observable<string> {
    return this.firebaseService.signInWithGoogle();
  }

  signOut(): Observable<void> {
    return this.firebaseService.signOut();
  }
}
