import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})

export class NewUserComponent implements OnInit {
  modify = false
  hasError = false
  errors = []
  successMessage: string = ""
  newUserForm: FormGroup
  btnDisabled: boolean = false

  constructor(
    private formBuilder: FormBuilder,
    private _userService: UserService,
    private _ac: ActivatedRoute
  ) { }

  get form() {
    return this.newUserForm.controls
  }

  existUser() {
    this.removeMessages();
    let username = this.form.username.value
    if (username != "" && username.length > 2) {
      this._userService.existUser(username).subscribe(response => {
        console.log(response);
        if (response.success == 0) {
          this.hasError = true
          this.errors.push('El usuario ya existe')
          this.btnDisabled = true
        } else {
          this.btnDisabled = false
        }
      })
    }
  }

  matchPasswords() {
    if (this.form.password.value == this.form.password2.value) {
        return true
    } else {
      this.hasError = true
      this.errors.push('Las contraseñas no coinciden')
    }

    return false
  }

  onSubmit() {
    this.removeMessages()

    if (this.form.username.status != "INVALID" && this.form.password.status != "INVALID"
    && this.form.password2.status != "INVALID" && this.form.email.status != "INVALID"
    && this.matchPasswords()) {
      this.hasError = false
      this._userService.saveUser(this.form.username.value, this.form.password.value, this.form.email.value, this.form.id.value)
      .subscribe(response => {
        this.successMessage = response.msg
        if (!this.modify) {
          this.btnDisabled = true
        }
        
      });
    } else {
      this.hasError = true
    }
  }

  buildForm() {
    this.newUserForm = this.formBuilder.group({
      username: ['', Validators.required],
      password:  ['', Validators.required],
      password2:  ['', Validators.required],
      email: ['', Validators.required],
      id: ['0']
    })
  }

  updateValidators() {
    this.newUserForm.get('password').clearValidators();
    this.newUserForm.get('password').updateValueAndValidity()
    this.newUserForm.get('password2').clearValidators();
    this.newUserForm.get('password2').updateValueAndValidity();
  }

  updateFormValues() {
    this._ac.paramMap.subscribe(params => {
      const internId: string = params.get('id');
      if (internId != null) {
        this.modify = true
        this._userService.getUserData(internId).subscribe(Response => {
          this.newUserForm.setValue({
            id: Response.id,
            username: Response.username,
            password: '',
            password2: '',
            email: Response.email
          })

          this.updateValidators();
        });
      }
    })
  }

  removeMessages() {
    this.errors = []
    this.successMessage = ""
  }

  ngOnInit() {
    this.buildForm()
    this.updateFormValues()
  }
}
