import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';
import { User } from 'src/app/interfaces/user';
import { ErrorService } from 'src/app/services/error.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  username: string = ''
  password: string = '';
  loadingSpinner: boolean = false;


  constructor(private toastr: ToastrService,
    private _loginService: UserService, private router: Router,
    private msjError: ErrorService
  ) {

  }

  ngOnInit(): void { }

  login(): void {
    //validamos que el usuario ingrese datos
    if (this.username == '' || this.password == '') {
      //mensaje que debe ingresar los datos
      this.toastr.error('Debe completar los campos obligatorios', 'Login Fallido', {
        timeOut: 3000,
        positionClass: 'toast-top-right',
      });

      return
    }

    const user: User = {
      username: this.username,
      password: this.password
    }

    this.loadingSpinner = true

    this._loginService.login(user).subscribe({
      next: (response) => {
        this.loadingSpinner = false;
        this.toastr.success(`El usuario ${this.username} se ha logueado con Éxito`, 'Login Exitoso')
        localStorage.setItem('token', response)
        this.router.navigate(['/dashboard'])
      },

      error: (e: HttpErrorResponse) => {
        this.loadingSpinner = false;
        //mensaje de error
        this.msjError.msjError(e)

      },
    })
  }

}
