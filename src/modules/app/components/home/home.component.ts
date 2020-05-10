import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/modules/auth/services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isAuthenticated$: Observable<boolean>;

  constructor(private authService: AuthenticationService) {
    this.isAuthenticated$ = authService.isAuthenticated$;
  }

  onSignout() {
    this.authService.signOut();
  }

  ngOnInit() {
  }

}
