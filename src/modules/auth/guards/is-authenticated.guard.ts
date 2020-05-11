import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { LocalStorageService } from 'src/modules/shared/services/local-storage.service';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs/operators';
import { AuthStore } from '../services/auth.store';

@Injectable()
export class IsAuthenticatedGuard implements CanActivate {

  constructor(private router: Router,
              private authStore: AuthStore) {
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
