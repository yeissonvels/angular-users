import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/interfaces/interface';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  errors: boolean = false
  user: User
  loginForm: FormGroup
  loginError: boolean = false
  btnDisabled: boolean = true

  constructor(
    private _data: DataService,
    private _formBuilder: FormBuilder,
    private _userService: UserService,
    private _router: Router,
  ) { }

  ngOnInit() {
    this.redirectIfIsUserLoggedIn();
    this.loginForm = this._formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.compose(
        [Validators.required]
      )]
    })
  }

  redirectIfIsUserLoggedIn() {
    if (this._data.isUserLoggedIn()) {
      this._router.navigate(['/perfil']);
    }
  }

  get form() {
    return this.loginForm.controls
  }

  validateFields() {
    this.btnDisabled = true;
    if (this.form.username.status != "INVALID" && this.form.password.status != "INVALID") {
      this.btnDisabled = false;
    }
  }

  onSubmit() {
    if (this.form.username.status != "INVALID" && this.form.password.status != "INVALID") {
      this._userService.login(this.form.username.value, this.form.password.value).subscribe(
        response => {
          if (response.success == 1) {
            this._data.setUserLoggedIn(response.user)
            this._router.navigate(['/perfil']);
          } else {
            this.loginError = true
          }
        }
      )
    } else {
      this.errors = true;
    }
  }
}
