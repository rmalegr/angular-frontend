import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'frontend Mascotas';
  //crear una interfaz de mascota

  //Crear un funcion que imprime un saludo
  imprimirSaludo(): void {
    console.log('Hola mundo');
  }
}
