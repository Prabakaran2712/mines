import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { Board } from '../Board';
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
    } else if (this.board.stateboard[x][y] == 'F') {
      this.board.stateboard[x][y] = 'H';
    }
  }
  constructor(
    private router: ActivatedRoute,
    private serve: RestServiceService
  ) {}

  timeadd() {
    if (this.milliseconds >= 1000) {
      this.milliseconds = 0;
      this.time += 1;
    }
  }
  millisecondsadd() {
    this.milliseconds++;
  }
  ngOnInit(): void {
    this.mode = this.router.snapshot.params['mode'];
    this.board = new Board(
      this.data[this.mode].row,
      this.data[this.mode].col,
      this.data[this.mode].mines
    );

    this.score_set = false;
    this.id = setInterval(() => {
      this.timeadd();
    }, 1000);
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
      this.score = this.time + Math.pow(10, -13) * this.milliseconds;
      this.serve
        .addScores({
          difficulty: this.mode,
          score: this.score,
          mines: this.data[this.mode].mines,
          user_details: this.user_id,
          mazesize: String(
            this.data[this.mode].row + 'x' + this.data[this.mode].col
          ),
        })
        .subscribe({
          next: (data) => {},
        });
      this.score_set = true;
    }

    if (this.time > 30) {
      this.value = 6;
    } else if (this.time > 60) {
      this.value = 3;
    } else if (this.time > 120) {
      this.value = 1;
    } else if (this.time > 180) {
      this.value = 0.1;
    }
  }
}
