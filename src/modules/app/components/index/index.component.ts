import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/modules/auth/services/authentication.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  isAuthenticated$: Observable<boolean>;

  constructor(private authService: AuthenticationService) {
    this.isAuthenticated$ = authService.isAuthenticated$;
  }

  ngOnInit() {
  }

  onSignout() {
    this.authService.signOut();
  }

}
