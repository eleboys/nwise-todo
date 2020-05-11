import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/modules/auth/services/auth.service';
import { AuthStore } from 'src/modules/auth/services/auth.store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isAuthenticated$: Observable<boolean>;

  constructor(private authStore: AuthStore,
              private authService: AuthService) {
    this.isAuthenticated$ = this.authStore.select("isAuthenticated");
  }

  onSignout() {
    this.authService.signOut();
  }

  ngOnInit() {
  }

}
