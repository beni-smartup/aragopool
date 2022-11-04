import { Component } from '@angular/core';
import { ResultService } from './result.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})

export class ResultComponent {
  map: string = 'https://idearagon.aragon.es/Visor2D?service=WMS&version=1.1.0&request=GetMap&layers=VISOR2D%3ALimAragon,VISOR2D%3AMunicipio_t2m&bbox=569192.3553%2C4412927.4576%2C810631.1337%2C4754878.6523&width=271&height=384&srs=EPSG%3A25830&format=image/png&CQL_FILTER=1=1;c_muni_ine=22001';

  constructor(public resultSvc: ResultService) { }

  poblacion: any;
  density: any;
  sueloUrbano: any;
  sueloRural: any;
  poligonos: any;
  email: any;
  telefono: any;
  direccion: any;
  codPostal: any;
  creativeWork: any;
  miembrosPleno: any;

  ngOnInit() {
    this.density = this.resultSvc.density;

    this.resultSvc.getSueloUrbanoData().subscribe((data: any) => {
      this.sueloUrbano = data.results.bindings[1].urbano.value
      this.sueloRural = data.results.bindings[1].rustico.value
    });

    this.resultSvc.getPoblacionData().subscribe((data: any) => {
      this.poblacion = data.results.bindings[10].poblac.value;
    });

    this.resultSvc.getDensidadData().subscribe((data: any) => {
      this.density = (Number(data.results.bindings[0].densidad_de_poblacion_habkm2.value)).toFixed(1);
    });

    this.resultSvc.getPoligonos().subscribe((data: any) => {
      this.poligonos = data.results.bindings[0]['callret-0'].value;
    });

    this.resultSvc.getDatosContacto().subscribe((data) => {
      this.email = data.results.bindings[0].email.value;
      this.telefono = data.results.bindings[0].tel.value;
      this.direccion = data.results.bindings[0].direccion.value.toLowerCase();
      this.codPostal = data.results.bindings[0].codPostal.value;
    });

    this.resultSvc.getCreativeWorkd().subscribe((data) => {
      this.creativeWork = data.results.bindings;
    });

    this.resultSvc.getMiembrosPleno().subscribe((data) => {
      this.miembrosPleno = data.results.bindings;
      console.log(this.miembrosPleno);

    })
  }
}
