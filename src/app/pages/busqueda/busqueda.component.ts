import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Usuario } from '../../models/usuario.model';
import { Profesional } from '../../models/profesional.model';
import { CentroMedico } from '../../models/centro-medico.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: []
})
export class BusquedaComponent implements OnInit {

  usuarios: Usuario[] = [];
  profesionales: Profesional[] = [];
  centrosMedicos: CentroMedico[] = [];

  constructor(
    public activateRoute: ActivatedRoute,
    public http: HttpClient
  ) {
    activateRoute.params.subscribe( params => {
      const termino = params['termino'];
      this.buscar(termino);
    });
  }

  ngOnInit() {
  }

  buscar( termino: string ) {
    const url = URL_SERVICIOS + '/busqueda/todo/' + termino;
    this.http.get( url )
        .subscribe( (resp: any) => {
          console.log(resp);
          this.centrosMedicos = resp.centrosMedicos;
          this.profesionales = resp.profesionales;
          this.usuarios = resp.usuarios;
        });
  }

}
