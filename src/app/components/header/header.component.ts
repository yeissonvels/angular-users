import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { User } from 'src/app/interfaces/interface'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  user: User
  isUserLoggedIn: boolean = false

  constructor(
    public _data: DataService
  ) { }

  logout() {
    this._data.logout();
    this.isUserLoggedIn = this._data.isUserLoggedIn()
  }

  ngOnInit() {
    this.isUserLoggedIn = this._data.isUserLoggedIn()
  }

}
