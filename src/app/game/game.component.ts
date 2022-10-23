import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Board } from '../Board';
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
  time: string = '';
  id: any;

  Interval: any;
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

  constructor(private router: ActivatedRoute) {}
  scoreadd() {
    this.score++;
  }
  ngOnInit(): void {
    this.mode = this.router.snapshot.params['mode'];
    this.board = new Board(
      this.data[this.mode].row,
      this.data[this.mode].col,
      this.data[this.mode].mines
    );

    this.id = setInterval(() => {
      this.scoreadd();
    }, 1000);
  }
  cleartimer() {
    if (this.id) {
      clearInterval(this.id);
    }
  }
}
