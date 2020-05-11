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

import { AuthStore } from '../services/auth.store';

@Injectable({
  providedIn: "root",
})
export class IsUnAuthenticatedGuard implements CanActivate {
  constructor(
    private router: Router,
    private authStore: AuthStore
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
