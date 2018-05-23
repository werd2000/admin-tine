import { Component, OnInit } from '@angular/core';
import { ProfesionalService } from '../../services/service.index';
import { Profesional } from '../../models/profesional.model';

@Component({
  selector: 'app-profesionales',
  templateUrl: './profesionales.component.html',
  styles: []
})
export class ProfesionalesComponent implements OnInit {

  public cargando: boolean = false;
  public totalRegistros: number = 0;
  public profesionales: Profesional[] = [];
  public desde: number = 0;

  constructor(
    public _profesionalService: ProfesionalService
  ) { }

  ngOnInit() {
    this.cargarProfesionales();
  }

  cargarProfesionales() {
    this.cargando = true;
    this._profesionalService.cargarProfesionales(this.desde)
        .subscribe( resp => {
          this.totalRegistros = this._profesionalService.totalProfesionales;
          this.profesionales = resp;
          this.cargando = false;
        });
  }

  buscarProfesional(termino: string) {
    if (termino.length <= 0 ) {
      this.cargarProfesionales();
      return;
    }
    this.cargando = true;
    this._profesionalService.buscarProfesional(termino)
        .subscribe( (resp: Profesional[]) => {
          this.totalRegistros = this._profesionalService.totalProfesionales;
          this.profesionales = resp;
          this.cargando = false;
        });

  }
  mostrarModal(id: number) {

  }

  editarProfesional(profesional: Profesional) {

  }

  borrarProfesional(profesional: Profesional) {
    this._profesionalService.borrarProfesional(profesional._id)
          .subscribe( () => this.cargarProfesionales() );
  }

  cambiarDesde(valor: number) {
    const desde = this.desde + valor;
    if ( desde >= this.totalRegistros ) {
      return;
    }

    if (desde < 0 ) {
      return;
    }

    this.desde += valor;
    this.cargarProfesionales();
  }

  crearProfesional() {

  }

}
