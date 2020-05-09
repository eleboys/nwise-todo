import { Component } from '@angular/core';
import { AuthenticationService } from 'src/modules/auth/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private authService: AuthenticationService,
              private router: Router) {
    this.authService.isAuthenticated$.subscribe(u => {
      if (!u) {
        setTimeout(() => {
          this.router.navigate(["signin"]);
        });
      }
    });
  }
}
