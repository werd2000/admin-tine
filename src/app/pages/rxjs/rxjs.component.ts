import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit {

  constructor() {

    this.regresaObservable()
      .retry(2)
      .subscribe(
      // el primer callback es cuando se ejecuta el next
      numero => console.log('Subs', numero),
      // el segundo callback es un error
      error => console.error ('Error en el observable ', error),
      // el tercer callback no recibe parametros y es cuando se completa
      () => console.log ('El observador termino')
    );
   }

  ngOnInit() {
  }

  regresaObservable(): Observable<number> {
    return new Observable( observer => {
      let contador = 0;
      const intervalo = setInterval( () => {
        contador += 1;
        observer.next(contador);

        if ( contador === 3 ) {
          clearInterval(intervalo);
          observer.complete();
        }

        if ( contador === 2 ) {
          clearInterval(intervalo);
          observer.error('Auxilio');
        }

      }, 1000);
    });

  }

}
