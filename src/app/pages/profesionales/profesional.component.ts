import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CentroMedico } from '../../models/centro-medico.model';
import { CentroMedicoService, ProfesionalService } from '../../services/service.index';
import { Profesional } from '../../models/profesional.model';
import { Router, ActivatedRoute } from '@angular/router';
import { URL_SERVICIOS } from '../../config/config';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-profesional',
  templateUrl: './profesional.component.html',
  styles: []
})
export class ProfesionalComponent implements OnInit {

  centrosMedicos: CentroMedico[] = [];
  profesional: Profesional = new Profesional('', '', '', '', '');
  centroMedico: CentroMedico = new CentroMedico('');

  constructor(
    public _profesionalService: ProfesionalService,
    public _centroMedico: CentroMedicoService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _modalUploadService: ModalUploadService
  ) {
    activatedRoute.params.subscribe( params => {
      const id = params['id'];
      if (id !== 'nuevo') {
        this.cargarProfesional(id);
      }
    });
  }

  ngOnInit() {
    this._centroMedico.cargarCentrosMedicos()
        .subscribe( centros => this.centrosMedicos = centros);
    this._modalUploadService.notificacion
          .subscribe( resp => {
            this.profesional.img = resp.profesional.img;
          });
  }

  guardarProfesional(forma: NgForm) {
    if ( forma.invalid ) {
      return;
    }

    this._profesionalService.guardarProfesional(this.profesional)
        .subscribe( profesional => {
          this.profesional._id = profesional._id;
          this.router.navigate(['/profesional', profesional._id]);
        });
  }

  cambioCentroMedico( id: string ) {
    this._centroMedico.obtenerCentroMedico(id)
      .subscribe( resp => {
        console.log(resp);
        if (resp) {
          this.centroMedico = resp;
        } else {
          this.centroMedico = new CentroMedico('');
        }
      });
  }

  cargarProfesional( id: string ) {
    this._profesionalService.cargarProfesional(id)
        .subscribe( (profesional: Profesional) => {
          this.profesional = profesional;
          this.profesional.centroMedico = profesional.centroMedico._id;
          this.cambioCentroMedico(this.profesional.centroMedico);
        });
  }

  cambiarFoto() {
    this._modalUploadService.mostrarModal( 'profesionales', this.profesional._id );
  }

}
