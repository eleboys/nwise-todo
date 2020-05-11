import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  signinForm: FormGroup;
  errorMessage: string;

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.initSigninForm();
  }

  onSubmit(): void {
    this.authService.signInEmailPassword(this.signinForm.value.email, this.signinForm.value.password)
                    .subscribe({
                      next: (display) => {
                        this.router.navigate([""]);
                        this.errorMessage = null;
                      },
                      error: (er) => this.errorMessage = er.message
                    });
  }

  onGoogleSignIn(): void {
    this.authService.signInWithGoogle()
                    .subscribe({
                      next: (display) => {
                        this.router.navigate([""]);
                        this.errorMessage = null;
                      },
                      error: (er) => this.errorMessage = er.message
                    });
  }

  initSigninForm(): void {
    this.signinForm = new FormGroup({
      email : new FormControl("", [ Validators.required ]),
      password: new FormControl("", [ Validators.required ])
    });
  }

}
