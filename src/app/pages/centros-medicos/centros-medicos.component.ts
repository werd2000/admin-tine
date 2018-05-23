import { Component, OnInit } from '@angular/core';
import { CentroMedico } from '../../models/centro-medico.model';
import { CentroMedicoService, ModalUploadService } from '../../services/service.index';
declare var swal: any;

@Component({
  selector: 'app-centros-medicos',
  templateUrl: './centros-medicos.component.html',
  styles: []
})
export class CentrosMedicosComponent implements OnInit {

  centrosMedicos: CentroMedico[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor(
    public _centroMedicoService: CentroMedicoService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarCentrosMedicos();
    this._modalUploadService.notificacion
        .subscribe( resp => this.cargarCentrosMedicos());
  }

  cargarCentrosMedicos() {
    this.cargando = true;
    this._centroMedicoService.cargarCentrosMedicos(this.desde)
      .subscribe( (resp: any) => {
        this.totalRegistros = this._centroMedicoService.totalCentrosMedicos;
        this.centrosMedicos = resp;
        this.cargando = false;
      });
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
    this.cargarCentrosMedicos();
  }

  buscarCentroMedico( termino: string ) {
    if (termino.length <= 0 ) {
      this.cargarCentrosMedicos();
      return;
    }
    this.cargando = true;
    this._centroMedicoService.buscarCentroMedico(termino)
      .subscribe( (centrosMedicos: CentroMedico[]) => {
        this.totalRegistros = centrosMedicos.length;
        this.centrosMedicos = centrosMedicos;
        this.cargando = false;
      });
  }

  borrarCentroMedico( centroMedico: CentroMedico ) {

    swal({
      title: '¿Está seguro?',
      text: 'Está por borrar a ' + centroMedico.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true

    }).then ( borrar => {
      // console.log(borrar);
      this._centroMedicoService.borrarCentroMedico( centroMedico._id )
          .subscribe( borrado => {
            // console.log(borrado);
            this.desde = 0;
            this.cargarCentrosMedicos();
          });

    });
  }

  guardarCentroMedico (centroMedico: CentroMedico) {
    this._centroMedicoService.actualizarCentroMedico(centroMedico)
        .subscribe();
  }

  mostrarModal(id: string) {
    this._modalUploadService.mostrarModal('centros_medicos', id);
  }

  crearCentroMedico() {
    swal({
      title: 'Crear Centro Médico',
      text: 'Ingrese el nombre del nuevo Centro Médico.',
      content: 'input',
      icon: 'info',
      buttons: true,
      dangerMode: true
      // button: {
      //   text: 'Guardar',
      //   closeModal: false,
      // },
    })
    .then( resp => {
      if (!resp || resp === '' || resp.length === 0) {
        console.error('No ingresó el nombre del nuevo Centro Médico');
        swal.close();
        return;
      }

      // const cm = new CentroMedico( resp );
      console.log(resp);

      this._centroMedicoService.crearCentroMedico(resp)
        .subscribe( respu => this.cargarCentrosMedicos() );
      swal.close();
    });
  }

}
