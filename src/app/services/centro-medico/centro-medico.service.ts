import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { UsuarioService } from '../usuario/usuario.service';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import { CentroMedico } from '../../models/centro-medico.model';

@Injectable()
export class CentroMedicoService {

  token: string;
  centroMedico: CentroMedico;
  totalCentrosMedicos: number = 0;

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService,
    public _subirArchivoService: SubirArchivoService
  ) {
    this.token = this._usuarioService.token;
  }

  cargarCentrosMedicos( desde: number = 0 ) {
    const url = URL_SERVICIOS + '/centro_medico?desde=' + desde;
    return this.http.get( url )
          .map( (resp: any) => {
            this.totalCentrosMedicos = resp.total;
            return resp.centrosMedicos;
          });
  }

  obtenerCentroMedico(id: string) {
    const url = URL_SERVICIOS + '/centro_medico/' + id;
    return this.http.get(url)
          .map( (resp: any) => resp.centroMedico );
  }

  buscarCentroMedico( termino: string ) {
    const url = URL_SERVICIOS + '/busqueda/coleccion/centro_medico/' + termino;
    return this.http.get(url)
        .map( ( resp: any ) =>  resp.centro_medico );
  }

  borrarCentroMedico( id: string ) {
    const url = URL_SERVICIOS + '/centro_medico/' + id + '?token=' + this.token;
    return this.http.delete (url)
          .map( resp => {
            swal('Centro médico borrado', 'El Centro Médico ha sido eliminado correctamente', 'success');
            return true;
          });
  }

  cambiarImagen( archivo: File, id: string) {

    this._subirArchivoService.subirArchivo(archivo, 'centros_medicos', id)
      .then( (resp: any) => {
        this.centroMedico.img = resp.centroMedico.img;
        swal('Imagen actualizada', this.centroMedico.nombre, 'success');
      })
      .catch( resp => {
        console.log(resp);
      });
  }

  crearCentroMedico(	nombre: string	) {
    const url = URL_SERVICIOS + '/centro_medico?token=' + this.token;
    return this.http.post(url, {nombre})
            .map( (resp: any) => resp.centroMedico );
  }

  // Actualiza datos del centro médico
  // recibe el obj centro medico
  actualizarCentroMedico(centro: CentroMedico) {
    let url = URL_SERVICIOS + '/centro_medico/' + centro._id;
    url += '?token=' + this.token;
    return this.http.put(url, centro)
      .map( (resp: any) => {
        swal('Centro Médico actualizado', centro.nombre, 'success');
        return resp.centroMedico;
      });
  }

}
