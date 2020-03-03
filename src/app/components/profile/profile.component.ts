import { Component, OnInit, Host } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { User } from 'src/app/interfaces/interface';
import { HeaderComponent } from '../header/header.component';
import { IconService } from 'src/app/services/icon.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: User
  editIcon: any

  constructor(
    private _data: DataService,
    private _icon: IconService,

  ) { }

  ngOnInit() {
    this.currentUser = this._data.getUserLoggedIn()
    this.editIcon = this._icon.getEditIcon()
  }
}
