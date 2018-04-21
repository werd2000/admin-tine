import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Injectable()
export class SettingsService {

  ajustes: Ajustes = {
    temaUrl: 'assets/css/colors/default.css',
    tema: 'default'
  };


  constructor( @Inject(DOCUMENT) private _document ) {
    this.cargarAjustes();
  }

  // Guardo los ajustes en el local storage
  // envio como parametro el nombre ajustes
  // y el objeto ajuste previamente convertido a string
  // ya que solo se puede guardar string en el Local Storage
  guardarAjustes() {
    localStorage.setItem('ajustes', JSON.stringify(this.ajustes));
  }

  // Cargo los ajustes del local storage
  // primero verifico que exista
  // si existe lo guardo en la propiedad ajustes
  // previamente convertido a Objeto con el JSON.parse
  cargarAjustes() {
    if ( localStorage.getItem('ajustes')) {
      this.ajustes = JSON.parse( localStorage.getItem('ajustes') );
    }
    this.aplicarTema( this.ajustes.tema );
  }

  aplicarTema( tema: string ) {
    const url = `assets/css/colors/${ tema }.css`;
    this._document.getElementById('theme').setAttribute( 'href', url );

    this.ajustes.temaUrl = url;
    this.ajustes.tema = tema;
    this.guardarAjustes();
  }
}

interface Ajustes {
  temaUrl: string;
  tema: string;
}
