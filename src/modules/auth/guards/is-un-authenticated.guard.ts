import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
  CanActivate,
} from "@angular/router";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';

import { AuthenticationStore } from '../services/authentication.store';

@Injectable({
  providedIn: "root",
})
export class IsUnAuthenticatedGuard implements CanActivate {
  constructor(
    private router: Router,
    private authStore: AuthenticationStore
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return this.authStore.select("isAuthenticated").pipe(
      map(a => {
        if (!a) {
          return true;
        } else {
          return this.router.parseUrl('/');
        }
      })
    );
  }
}
