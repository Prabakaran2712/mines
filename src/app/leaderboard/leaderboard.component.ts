import { Component, OnInit } from '@angular/core';
import { RestServiceService } from '../rest-service.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css'],
})
export class LeaderboardComponent implements OnInit {
  leadersdata!: any[];
  option: string = 'easy';

  constructor(private serve: RestServiceService) {}
  ngOnInit(): void {
    this.serve.getScores().subscribe({
      next: (data) => {
        this.leadersdata = data;
      },
    });
  }
}
