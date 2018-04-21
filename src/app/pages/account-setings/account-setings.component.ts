import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { SettingsService } from '../../services/service.index';


@Component({
  selector: 'app-account-setings',
  templateUrl: './account-setings.component.html',
  styles: []
})
export class AccountSetingsComponent implements OnInit {

  constructor( public _ajustes: SettingsService) { }

  ngOnInit() {
    this.colocarCheck();
  }

  // El link debería ser elementRef
  cambiarColor( tema, link: any ) {

    this.aplicarCheck( link );

    this._ajustes.aplicarTema(tema);

  }

  aplicarCheck( link: any ) {

    const selectores: any = document.getElementsByClassName('selector');

    for ( const ref of selectores ) {
      ref.classList.remove('working');
    }

    link.classList.add('working');

  }

  colocarCheck() {
    const selectores: any = document.getElementsByClassName('selector');
    for ( const ref of selectores ) {
      if ( ref.getAttribute('data-theme') === this._ajustes.ajustes.tema ) {
        ref.classList.add('working');
        break;
      }
    }
  }

}
