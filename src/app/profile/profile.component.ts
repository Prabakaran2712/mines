import { Component, OnInit } from '@angular/core';
import { RestServiceService } from '../rest-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  userdetails: any;
  scoredetails!: any[];
  constructor(public serve: RestServiceService) {}

  ngOnInit(): void {
    this.serve.getUser().subscribe({
      next: (data: any) => {
        this.userdetails = data;
      },
    });
    this.serve.getUserScores().subscribe({
      next: (data: any) => {
        this.scoredetails = data;
      },
    });
  }
}
