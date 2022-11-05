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
  constructor(
    private formBuider: FormBuilder,
    private serve: RestServiceService,
    private router: Router
  ) {}
  onSubmit(): boolean {
    this.userdata = {
      name: this.offerRideForm.controls['name'].value,
      email: this.offerRideForm.controls['email'].value,
      password: this.offerRideForm.controls['password'].value,
    };
    this.addUser();

    this.serve.setUser(this.userdata._id, this.userdata.name);
    this.router.navigate(['']);
    return true;
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
      },
    });
  }
}
