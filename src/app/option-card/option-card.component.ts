import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-option-card',
  templateUrl: './option-card.component.html',
  styleUrls: ['./option-card.component.css'],
})
export class OptionCardComponent implements OnInit {
  @Input('difficulty') difficulty: string = 'easy'; // pass object (needs to be changed)
  @Input('size') size: number = 9;
  @Input('minecount') minecount: number = 10;

  constructor(private router: Router) {}
  play(mode: string) {
    this.router.navigate(['game', mode]);
  }
  ngOnInit(): void {}
}
