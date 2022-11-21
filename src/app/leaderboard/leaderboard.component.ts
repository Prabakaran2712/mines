import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestServiceService } from '../rest-service.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css'],
})
export class LeaderboardComponent implements OnInit {
  leadersdata!: any[];
  option: string = 'easy';
  redirect(id: any) {
    this.router.navigate([`/profile/${id}`]);
  }
  constructor(private serve: RestServiceService, private router: Router) {}
  ngOnInit(): void {
    this.serve.getScores().subscribe({
      next: (data) => {
        this.leadersdata = data.filter((d) => d.win);
        this.leadersdata = this.leadersdata.slice(0, 11);
      },
    });
  }
}
