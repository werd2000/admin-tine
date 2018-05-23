import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class ModalUploadService {

  // Profesional, Centro Médico o Usuario
  public tipo: string;
  // id del profesional o centro médico o usuario
  public id: string;

  public oculto: string = 'oculto';

  public notificacion = new EventEmitter<any>();

  constructor() {
    // console.log('ModalUploadService listo');
  }

  ocultarModal() {
    this.oculto = 'oculto';
    this.id = null;
    this.tipo = null;
  }

  mostrarModal( tipo: string, id: string ) {
    this.oculto = '';
    this.id = id;
    this.tipo = tipo;
  }

}
