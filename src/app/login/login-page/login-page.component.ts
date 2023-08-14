import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  spinner = false;

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.loginForm = this.formBuilder.group({
      email: ['test@test.com', [Validators.required, Validators.email]],
      password: ['12345678', [Validators.required, Validators.minLength(8)]]
    });
  }

  ngOnInit(): void {
    
  }

  login() {
    this.submitted = true;

    if (this.loginForm.valid) {
      // can force a value since check for validity prevents NULL
      const email = this.loginForm.get('email')!.value.trim();
      // intentional spaces at the beginning or end will be removed
      const password = this.loginForm.get('password')!.value.trim();

      this.spinner = true;

      // simulate a network call with short timeout
      setTimeout(() => {
        localStorage.setItem('email', email);
        this.router.navigate(['/app/teams']);
      }, 300);
    }
  }
}
