import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { LocalStorageService } from 'src/modules/shared/services/local-storage.service';
import { AuthenticationService } from '../services/authentication.service';
import { map } from 'rxjs/operators';
import { AuthenticationStore } from '../services/authentication.store';

@Injectable()
export class IsAuthenticatedGuard implements CanActivate {

  constructor(private router: Router,
              private authStore: AuthenticationStore) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return this.authStore.select("isAuthenticated").pipe(
      map(a => {
        if (a) {
          return true;
        } else {
          return this.router.parseUrl('/signin');
        }
      })
    );
  }
}
