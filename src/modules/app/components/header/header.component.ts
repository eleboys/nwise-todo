import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from 'src/modules/auth/models/user.model';
import { AuthenticationService } from 'src/modules/auth/services/authentication.service';
import { ComponentBase } from 'src/modules/shared/models/component-base';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthenticationStore } from 'src/modules/auth/services/authentication.store';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent extends ComponentBase implements OnInit {

  currentUser$: Observable<User>;

  constructor(private authService: AuthenticationService,
              private authStore: AuthenticationStore,
              private router: Router) {
    super();
    this.currentUser$ = authStore.select("currentUser");
  }

  ngOnInit() {
  }

  signOut() {
    this.authService.signOut().pipe(
      takeUntil(this.unsubscribe)
    ).subscribe({
      next: () => this.router.navigate(["signin"]),
      error: (er) => console.log(er)
    });
  }

}
