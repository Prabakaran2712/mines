import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Output() onHome = new EventEmitter<string>();
  constructor() {}
  back(value: string) {
    this.onHome.emit(value);
  }
  ngOnInit(): void {}
}
