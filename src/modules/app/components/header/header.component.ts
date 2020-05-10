import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from 'src/modules/auth/models/user.model';
import { AuthenticationService } from 'src/modules/auth/services/authentication.service';
import { BaseComponent } from 'src/modules/shared/shared/models/base-component';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent extends BaseComponent implements OnInit {

  currentUser$: Observable<User>;

  constructor(private authService: AuthenticationService,
              private router: Router) {
    super();
    this.currentUser$ = authService.currentUser$;
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
