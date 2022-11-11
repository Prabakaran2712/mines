import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Route, Router } from '@angular/router';
import { takeWhile } from 'rxjs';
import { RestServiceService } from '../rest-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Output() onHome = new EventEmitter<string>();
  islogged = false;
  userdata!: any;
  userid!: any;
  constructor(public serve: RestServiceService, public router: Router) {}
  back(value: string) {
    this.onHome.emit(value);
  }
  logout() {
    localStorage.removeItem('userid');
    localStorage.removeItem('username');
    delete this.userdata;
    this.router.navigate(['/login']);
  }
  ngDoCheck() {
    if (localStorage.getItem('username')) {
      this.userdata = localStorage.getItem('username');
      this.userid = localStorage.getItem('userid');
    }
  }
  ngOnInit(): void {}
}
