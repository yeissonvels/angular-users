import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/interfaces/interface';
import { DataService } from 'src/app/services/data.service';
import { IconService } from 'src/app/services/icon.service';
import { SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  users: [User]
  userLogged: boolean
  message: string = ""
  deleteIcon: any
  editIcon: any

  constructor(
    private _user: UserService, 
    private _data: DataService,
    private _icon: IconService,
    
  ) { }

  ngOnInit() {
    this._user.getUsers().subscribe(Response => this.users = Response)
    this.editIcon = this._icon.getEditIcon()
    this.deleteIcon = this._icon.getDeleteIcon()
  }

  deleteUser(id) {
    if (confirm('¿Estás seguro de que deseas eliminar el usuario seleccionado?')) {
      this._user.deleteUser(id).subscribe(Response => {
        if (Response.success == 1) {
          this.ngOnInit()
          this.message = Response.msg
        }
      })
    }
  }
}