import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { __makeTemplateObject } from 'tslib';
import { RestServiceService } from '../rest-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  userdetails: any;
  scoredetails!: any[];
  easybest = 0;
  mediumbest = 0;
  hardbest = 0;
  allscore!: any;
  userid!: string;
  loggeduser!: string;
  isauthuser: boolean = false;
  loading: boolean = true;
  constructor(
    public serve: RestServiceService,
    private router: ActivatedRoute
  ) {}

  loadUserDetail(id: any) {
    this.userid = id;
    this.serve.getUserId().subscribe({
      next: (data: any) => {
        if (data == this.userid) {
          this.isauthuser = true;
        } else {
          this.isauthuser = false;
        }
      },
    });
    this.serve.getUser(this.userid).subscribe({
      next: (data: any) => {
        this.userdetails = data;
      },
    });
    this.serve.getUserScores(this.userid).subscribe({
      next: (data: any) => {
        this.scoredetails = data;
      },
    });
    this.serve.getUserScores(this.userid).subscribe({
      next: (data: any) => {
        this.allscore = data;
        this.allscore.sort((a: any, b: any) =>
          a.score > b.score ? 1 : b.score > a.score ? -1 : 0
        );

        this.easybest = this.allscore.filter(
          (data: any) => data.difficulty == 'easy' && data.win
        ).length
          ? this.allscore.filter(
              (data: any) => data.difficulty == 'easy' && data.win
            )[0].score
          : 0;
        this.mediumbest = this.allscore.filter(
          (data: any) => data.difficulty == 'medium' && data.win
        ).length
          ? this.allscore.filter(
              (data: any) => data.difficulty == 'medium' && data.win
            )[0].score
          : 0;
        this.hardbest = this.allscore.filter(
          (data: any) => data.difficulty == 'hard' && data.win
        ).length
          ? this.allscore.filter(
              (data: any) => data.difficulty == 'hard' && data.win
            )[0].score
          : 0;
      },
    });
    this.loading = false;
  }
  ngOnInit(): void {
    this.router.params.subscribe((routeParams) => {
      this.loadUserDetail(routeParams['id']);
    });
    this.userid = this.router.snapshot.params['id'];
  }
}
