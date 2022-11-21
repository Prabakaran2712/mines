import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { RestServiceService } from '../rest-service.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  username!: string;
  password!: string;
  submitted!: boolean;
  validUser!: boolean;
  error!: string;
  constructor(
    private formBuider: FormBuilder,
    private serve: RestServiceService,
    public router: Router
  ) {}
  goto(link: string) {
    this.router.navigate([link]);
  }
  onSubmit(): boolean {
    this.username = this.loginForm.controls['email'].value;
    this.password = this.loginForm.controls['password'].value;
    this.submitted = true;
    this.serve.isUserAuthenticated(this.username, this.password).subscribe({
      next: (authenticated: any) => {
        if (authenticated.user) {
          this.validUser = true;
          this.error = '';
          this.router.navigate(['']);

          this.serve.setUser(authenticated.user._id, authenticated.user.name);
        } else {
          this.validUser = false;
        }
      },
      error: (err) => {
        this.error = err;
        this.validUser = false;
      },
    });
    return true;
  }
  ngOnInit(): void {
    this.submitted = false;
    this.loginForm = this.formBuider.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
}
