import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { Board } from '../Board';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { faFlag } from '@fortawesome/free-solid-svg-icons';
import { RestServiceService } from '../rest-service.service';
interface Map {
  [name: string]: any;
}
@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {
  clockicon = faClock;
  flagicon = faFlag;
  score: number = 0;
  mode: string = 'easy';
  board: Board = new Board(9, 9, 10);
  time: number = 0;
  id: any;
  value: number = 10;
  Interval: any;
  score_set: boolean = false;
  user_id: any;
  milliseconds: any = 0;
  url!: string;

  displayTime: any;
  startTime: any;

  data: Map = {
    easy: {
      row: 9,
      col: 9,
      mines: 10,
    },
    medium: {
      row: 16,
      col: 16,
      mines: 40,
    },
    hard: {
      row: 24,
      col: 24,
      mines: 99,
    },
  };
  onRightClick(event: any, x: number, y: number) {
    event.preventDefault();
    if (this.board.stateboard[x][y] == 'H') {
      this.board.stateboard[x][y] = 'F';
      this.board.flagcount--;
    } else if (this.board.stateboard[x][y] == 'F') {
      this.board.stateboard[x][y] = 'H';
      this.board.flagcount++;
    }
  }
  constructor(
    private router: ActivatedRoute,
    private route: Router,
    private serve: RestServiceService
  ) {}

  updateDisplayTime() {
    this.displayTime =
      Math.ceil((Date.now() - this.startTime) / 1000) +
      ':' +
      ((Math.ceil((Date.now() - this.startTime) / 10) % 90) + 10);
  }
  goto() {
    this.startTime = Date.now();

    this.mode = this.router.snapshot.params['mode'];
    this.url = 'game';
    this.board = new Board(
      this.data[this.mode].row,
      this.data[this.mode].col,
      this.data[this.mode].mines
    );

    this.score_set = false;
    this.id = setInterval(() => {
      this.updateDisplayTime();
    }, 10);
    this.serve.getUserId().subscribe({
      next: (data: any) => {
        this.user_id = data;
      },
    });
  }
  ngOnInit(): void {
    this.startTime = Date.now();

    this.mode = this.router.snapshot.params['mode'];
    this.url = 'game';
    this.board = new Board(
      this.data[this.mode].row,
      this.data[this.mode].col,
      this.data[this.mode].mines
    );

    this.score_set = false;
    this.id = setInterval(() => {
      this.updateDisplayTime();
    }, 10);
    this.serve.getUserId().subscribe({
      next: (data: any) => {
        this.user_id = data;
      },
    });
  }
  cleartimer() {
    if (this.id) {
      clearInterval(this.id);
    }
  }

  ngDoCheck() {
    if (this.board.gameover && this.board.iswin && !this.score_set) {
      this.score = (Date.now() - this.startTime) / 1000;
      this.serve
        .addScores({
          difficulty: this.mode,
          score: this.score,
          mines: this.data[this.mode].mines,
          user_details: this.user_id,
          mazesize: String(
            this.data[this.mode].row + 'x' + this.data[this.mode].col
          ),
          minesOpened:
            this.data[this.mode].row * this.data[this.mode].col -
            this.data[this.mode].mines,
          win: true,
        })
        .subscribe({
          next: (data) => {},
        });
      this.score_set = true;
    }
    if (this.board.gameover && !this.board.iswin && !this.score_set) {
      this.score = (Date.now() - this.startTime) / 1000;
      this.serve
        .addScores({
          difficulty: this.mode,
          score: this.score,
          mines: this.data[this.mode].mines,
          user_details: this.user_id,
          mazesize: String(
            this.data[this.mode].row + 'x' + this.data[this.mode].col
          ),
          minesOpened: this.board.foundcount,
          win: false,
        })
        .subscribe({
          next: (data) => {},
        });
      this.score_set = true;
    }
  }
}
