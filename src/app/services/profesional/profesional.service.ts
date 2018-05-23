import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';
import { Profesional } from '../../models/profesional.model';

@Injectable()
export class ProfesionalService {

  public totalProfesionales: number;

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  cargarProfesionales(desde: number = 0) {
    const url = URL_SERVICIOS + '/profesional?desde=' + desde;
    return this.http.get(url)
      .map( (resp: any) => {
        this.totalProfesionales = resp.total;
        return resp.profesionales;
      });
  }

  buscarProfesional(termino: string) {
    const url = URL_SERVICIOS + '/busqueda/coleccion/profesional/' + termino;
    return this.http.get(url)
        .map( ( resp: any ) => resp.profesional );
  }

  borrarProfesional(id: string) {
    const url = URL_SERVICIOS + '/profesional/' + id + '?token=' + this._usuarioService.token;
    return this.http.delete(url)
        .map( resp => {
          swal('Profesional borrado', 'Profesional borrado correctamente', 'success');
          return resp;
        });
  }

  guardarProfesional( profesional: Profesional) {
    if (profesional._id !== '') {
      const url = URL_SERVICIOS + '/profesional/' + profesional._id + '?token=' + this._usuarioService.token;
      return this.http.put(url, profesional)
          .map( (resp: any) => {
            swal('Profesional actualizado', profesional.nombre, 'success');
            return resp.profesional;
          });

    } else {
      const url = URL_SERVICIOS + '/profesional?token=' + this._usuarioService.token;
      return this.http.post(url, profesional)
          .map( (resp: any) => {
            swal('Profesional guardado', profesional.nombre, 'success');
            return resp.profesional;
          });
    }
  }

  cargarProfesional( id: string ) {
    const url = URL_SERVICIOS + '/profesional/' + id;
    return this.http.get(url)
        .map( (resp: any) => resp.profesional );
    
  }

}
