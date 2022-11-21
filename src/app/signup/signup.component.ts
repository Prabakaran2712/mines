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
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  offerRideForm!: FormGroup;
  userdata!: any;
  submitted!: boolean;
  errormsg!: string;
  constructor(
    private formBuider: FormBuilder,
    private serve: RestServiceService,
    private router: Router
  ) {}
  onSubmit(): any {
    this.userdata = {
      name: this.offerRideForm.controls['name'].value,
      email: this.offerRideForm.controls['email'].value,
      password: this.offerRideForm.controls['password'].value,
    };
    this.addUser();
  }
  ngOnInit(): void {
    this.submitted = false;
    this.offerRideForm = this.formBuider.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  addUser(): void {
    this.serve.addUsers(this.userdata).subscribe({
      next: (data) => {
        this.submitted = true;
        this.userdata = data;
        this.serve.setUser(data.user._id, data.user.name);
        this.router.navigate(['']);
      },
      error: (err) => {
        this.errormsg = err.error.error;
      },
    });
  }
}
