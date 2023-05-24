import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/interfaces/user';
import { ErrorService } from 'src/app/services/error.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  loading: boolean = false

  //Injectamos las dependencias  en el constructor 
  //ToastService , userService 
  //Router
  constructor(
    private toastrMensaje: ToastrService, private _sigInService: UserService, private router: Router, private _errorService: ErrorService) { }

  ngOnInit(): void { }

  addUser(): void {
    //Validamos que el usuario ingrese valores 
    if (this.username == '' || this.password == '' || this.confirmPassword == '') {
      this.toastrMensaje.error('Por favor, completa todos los campos', 'Error ')
      return
    }
    //Validamos  que las password sean iguales
    if (this.password !== this.confirmPassword) {
      console.log(this.password, this.confirmPassword)
      this.toastrMensaje.error('Las contraseñas no coinciden', 'Error ')
      return
    }

    //Creamos el objeto 
    const user: User = {
      username: this.username,
      password: this.password
    }

    this.loading = true //Muestro el Spinner

    //sucribe la data  -> Registra a la base de Datos 
    this._sigInService.sigIng(user).subscribe({
      next: (v) => {
        this.loading = false
        this.toastrMensaje.success(`El usuario ${this.username} fue creado con Éxito`, 'Registro éxito de usuario')
        this.router.navigate(['/login'])  //Redireccionamos al login
      },
      error: (e: HttpErrorResponse) => {
        this.loading = false;
        this._errorService.msjError(e);
      },
      complete: () => console.info('complete')

    })


  }

}
