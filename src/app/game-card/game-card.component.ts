import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.css'],
})
export class GameCardComponent implements OnInit {
  @Input('data') data: any;
  date: any;
  row: number = 0;
  col: number = 0;
  arr: any;
  constructor() {}

  ngOnInit(): void {
    this.date = new Date(this.data.createdAt);
    this.arr = this.data.mazesize.split('x');
    this.row = parseInt(this.arr[0]);
    this.col = parseInt(this.arr[1]);
  }
}
