import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string = 'usuario'): any {

    let url = URL_SERVICIOS + '/img';

    if (!img) {
      return url + '/usuario/xxx';
    }

    if (img.indexOf('https') >= 0 ) {
      return img;
    }



    switch ( tipo ) {
      case 'usuario':
        url += '/usuarios/' + img;
      break;
      case 'profesional':
        url += 'profesional/' + img;
      break;
      case 'centro_medico':
        url += 'centro_medico/' + img;
      break;
      default:
      console.log('Tipo de imagen no válida. Usuario, Profesional, Centro Médico');
      url += '/usuario/xxx';
    }
    console.log(url);
    
    return url;
  }

}
