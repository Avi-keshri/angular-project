import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResponseData, AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent implements OnInit {

  isLoginMode: boolean = false;
  error = null;
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router) { }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  ngOnInit(): void {
    this.authService.user.subscribe(user => {
      if (user) {
        this.router.navigate(['/recipes']);
      } else {
        this.router.navigate(['/auth']);
      }
    })
  }

  onSubmit(authForm: NgForm) {
    if (!authForm.valid) {
      return;
    }
    let authObs: Observable<AuthResponseData>;
    this.isLoading = true;
    const email = authForm.value.email;
    const password = authForm.value.password;
    if (this.isLoginMode) {
      authObs = this.authService.onLogin(email, password);
    } else {
      authObs = this.authService.onSignUp(email, password);
    }
    authObs.subscribe(resData => {
      this.isLoading = false;
      this.router.navigate(['/recipes']);
    }, errorMessage => {
      this.isLoading = false;
      this.error = errorMessage;
    });
    authForm.reset();
  }

}
