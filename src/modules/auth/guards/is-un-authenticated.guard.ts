import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
  CanActivate,
} from "@angular/router";
import { Observable } from "rxjs";

import { AuthenticationService } from "../services/authentication.service";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: "root",
})
export class IsUnAuthenticatedGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return this.authService.isAuthenticated$.pipe(
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
