import { Component } from '@angular/core';
import { SettingsService } from './services/service.index';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  // cargo el settingsService para que al se ejecute el constructor del servicio
  // que carga el tema guardado
  // esto puede hacerse en el pages.component.ts pero lo hicimos aca.
  constructor( public _ajustes: SettingsService ) {}

}
