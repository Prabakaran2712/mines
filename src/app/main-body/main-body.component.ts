import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Board } from '../Board';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-body',
  templateUrl: './main-body.component.html',
  styleUrls: ['./main-body.component.css'],
})
export class MainBodyComponent implements OnInit {
  page: string = 'home';

  difficulty!: string;
  play(mode: string) {
    this.router.navigate(['game', mode]);

    this.page = 'game';
  }
  constructor(private router: Router) {}

  ngOnInit(): void {}
}
