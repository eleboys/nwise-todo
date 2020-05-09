import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  signinForm: FormGroup;

  constructor(private authService: AuthenticationService,
              private router: Router) { }

  ngOnInit() {
    this.initSigninForm();
  }

  onSubmit(): void {
    this.authService.signInEmailPassword(this.signinForm.value.email, this.signinForm.value.password)
                    .subscribe({
                      next: (display) => this.router.navigate([""]),
                      error: (er) => console.log(er)
                    });
  }

  onGoogleSignIn(): void {
    this.authService.signInWithGoogle()
                    .subscribe({
                      next: (display) => this.router.navigate([""]),
                      error: (er) => console.log(er)
                    });
  }

  initSigninForm(): void {
    this.signinForm = new FormGroup({
      email : new FormControl("", [ Validators.required ]),
      password: new FormControl("", [ Validators.required ])
    });
  }

}
