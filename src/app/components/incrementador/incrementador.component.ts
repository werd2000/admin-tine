import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {

  @ViewChild('txtProgress') txtProgress: ElementRef;

  // Recibo la leyenda del padre
  @Input() leyenda: string = 'leyenda';
  // Recibo el progreso del padre
  @Input() progreso: number = 50;

  @Output() cambioValor: EventEmitter<number> = new EventEmitter();

  constructor() {  }

  ngOnInit() {
    // console.log( 'progreso ', this.progreso );
  }

  cambiarValor( valor: number ) {
    this.progreso += valor;
    if (this.progreso > 100 ) {
      this.progreso = 100;
    } else if ( this.progreso < 0 ) {
      this.progreso = 0;
    }
    this.cambioValor.emit( this.progreso );
    this.txtProgress.nativeElement.focus();
  }

  onChanges( newValue: number ) {
    // const elemHTML = document.getElementsByName('progreso')[0];

    // console.log( this.txtProgress );

    if ( newValue >= 100 ) {
      this.progreso = 100;
    } else if ( newValue <= 0 ) {
      this.progreso = 0;
    } else {
      this.progreso = newValue;
    }

    // elemHTML.value = this.progreso;
    this.txtProgress.nativeElement.value = this.progreso;

    this.cambioValor.emit ( this.progreso );
  }

}
