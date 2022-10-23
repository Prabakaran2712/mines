import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  page: string = 'home';
  title = 'mines';

  home(value: string): string {
    if (!value) return this.page;
    this.page = value;

    return this.page;
  }
}
