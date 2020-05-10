import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/modules/auth/services/authentication.service';
import { AuthenticationStore } from 'src/modules/auth/services/authentication.store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isAuthenticated$: Observable<boolean>;

  constructor(private authStore: AuthenticationStore,
              private authService: AuthenticationService) {
    this.isAuthenticated$ = this.authStore.select("isAuthenticated");
  }

  onSignout() {
    this.authService.signOut();
  }

  ngOnInit() {
  }

}
