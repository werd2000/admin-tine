import { NgModule } from '@angular/core';
// La linea de abajo puedo eliminar porque no se usa
// tiene la librería de los ngif ngfor etc
// import { CommonModule } from '@angular/common';
import { ImagenPipe } from './imagen.pipe';


@NgModule({
  imports: [],
  declarations: [
    ImagenPipe
  ],
  exports: [
    ImagenPipe
  ]
})
export class PipesModule { }
