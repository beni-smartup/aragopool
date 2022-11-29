import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PersonaService } from './persona.service';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.scss']
})


export class PersonaComponent implements OnInit {

  constructor(private _route: ActivatedRoute, private personaSvc: PersonaService) { }

  idPersona: any;
  //Datos persona
  cargos: any;
  datosContacto: any;
  datosAdicionales: any;
  creativeWorks: any;
  //queries
  queryUrlCargo!: string;
  queryUrlDatosContacto!: string;
  queryUrlDatosAdicionales!: string;
  queryUrlCreativeWorks!: string;
  idMunicipio!: string;
  sectorPersona!: string;


  ngOnInit(): void {
    this.idPersona = this._route.snapshot.paramMap.get('id');
    this.queryUrlCargo = `https://opendata.aragon.es/sparql?default-graph-uri=&query=PREFIX+org%3A+%3Chttp%3A%2F%2Fwww.w3.org%2Fns%2Forg%23%3E%0D%0A%0D%0Aselect+distinct+%3Fcargo+%3Fperson+%3FnombreRol++%3Forg+%3FnombreOrg+from+%3Chttp%3A%2F%2Fopendata.aragon.es%2Fdef%2Fei2av2%3E+%7B%0D%0A++OPTIONAL+%7B+%3Fperson+org%3Aholds+%3Fcargo.+%7D%0D%0A++OPTIONAL+%7B+%3Fcargo+org%3Arole+%3Frol.+%7D%0D%0A++OPTIONAL+%7B+%3Frol+dc%3Atitle+%3FnombreRol.++%7D%0D%0A++OPTIONAL+%7B+%3Fcargo+org%3ApostIn+%3Forg.+%7D%0D%0A++OPTIONAL+%7B+%3Forg+dc%3Atitle+%3FnombreOrg.+%7D%0D%0A++values+%3Fperson+%7B%3C${this.idPersona}%3E+%7D.%0D%0A%7D%0D%0Alimit+100&format=application%2Fsparql-results%2Bjson&timeout=0&signal_void=on`;
    this.queryUrlDatosContacto = `https://opendata.aragon.es/sparql?default-graph-uri=&query=PREFIX+foaf%3A+%3Chttp%3A%2F%2Fxmlns.com%2Ffoaf%2F0.1%2F%3E%0D%0A%0D%0Aselect+distinct+*+from+%3Chttp%3A%2F%2Fopendata.aragon.es%2Fdef%2Fei2av2%3E+%7B%09%0D%0A++OPTIONAL+%7B+%3Fperson+%3Chttp%3A%2F%2Fschema.org%2FadditionalType%3E+%3FaddT.+%7D%0D%0A++OPTIONAL+%7B+%3Fperson+foaf%3Aname+%3Fname.+%7D%0D%0A++OPTIONAL+%7B+%3Fperson+foaf%3Aphone+%3Fphone.+%7D%0D%0A++OPTIONAL+%7B+%3Fperson+%3Chttp%3A%2F%2Fpurl.org%2Fvocab%2Fbio%2F0.1%2Fbiography%3E+%3Fbiog.+%7D%0D%0A++OPTIONAL+%7B+%3Fperson+foaf%3Ambox+%3Fmbox.+%7D%0D%0A++OPTIONAL+%7B+%3Fperson+foaf%3Aimg+%3Fimg.+%7D%0D%0A++values+%3Fperson+%7B%3C${this.idPersona}%3E+%7D.%0D%0A%7D%0D%0Alimit+100&format=application%2Fsparql-results%2Bjson&timeout=0&signal_void=on`;
    this.queryUrlDatosAdicionales = `https://opendata.aragon.es/sparql?default-graph-uri=&query=PREFIX+foaf%3A+%3Chttp%3A%2F%2Fxmlns.com%2Ffoaf%2F0.1%2F%3E%0D%0A%0D%0Aselect+distinct+*+from+%3Chttp%3A%2F%2Fopendata.aragon.es%2Fdef%2Fei2av2%3E+%7B%09%0D%0A++OPTIONAL+%7B+%3Fperson+%3Chttp%3A%2F%2Fschema.org%2FadditionalType%3E+%3FaddT.+%7D%0D%0A++OPTIONAL+%7B+%3Fperson+foaf%3Aname+%3Fname.+%7D%0D%0A++OPTIONAL+%7B+%3Fperson+foaf%3Aphone+%3Fphone.+%7D%0D%0A++OPTIONAL+%7B+%3Fperson+%3Chttp%3A%2F%2Fpurl.org%2Fvocab%2Fbio%2F0.1%2Fbiography%3E+%3Fbiog.+%7D%0D%0A++OPTIONAL+%7B+%3Fperson+foaf%3Ambox+%3Fmbox.+%7D%0D%0A++OPTIONAL+%7B+%3Fperson+foaf%3Aimg+%3Fimg.+%7D%0D%0A++values+%3Fperson+%7B+%3C${this.idPersona}%3E+%7D.%0D%0A%7D%0D%0Alimit+100&format=application%2Fsparql-results%2Bjson&timeout=0&signal_void=on`;
    this.queryUrlCreativeWorks = `https://opendata.aragon.es/sparql?default-graph-uri=&query=select+distinct+%3Ftitle+%3Fabstract+%3Furl+from+%3Chttp%3A%2F%2Fopendata.aragon.es%2Fdef%2Fei2av2%3E+%7B%0D%0A++%3Fx+a+%3Chttp%3A%2F%2Fschema.org%2FCreativeWork%3E%3B%0D%0A++++++schema%3Aabout+%3C${this.idPersona}%3E%3B%0D%0A++++++schema%3Atitle+%3Ftitle%3B%0D%0A++++++schema%3Aabstract+%3Fabstract%3B%0D%0A++++++schema%3Aurl+%3Furl.%0D%0A%7D%0D%0Alimit+100&format=application%2Fsparql-results%2Bjson&timeout=0&signal_void=on`;

    this.personaSvc.getData(this.queryUrlCargo).subscribe(data => {
      console.log('Cargos: ', data.results.bindings);
      this.cargos = data.results.bindings;
      const urlMunicipio = data.results.bindings[0].org.value.split('/');
      this.idMunicipio = urlMunicipio[urlMunicipio.length - 1];
    });
    this.personaSvc.getData(this.queryUrlDatosContacto).subscribe(data => {
      console.log('Datos contacto: ', data.results.bindings);

      this.datosContacto = data.results.bindings;

    });
    this.personaSvc.getData(this.queryUrlDatosAdicionales).subscribe(data => {
      console.log('Datos adicionales: ', data.results.bindings);

      this.datosAdicionales = data.results.bindings;
      const urlSector = this.datosAdicionales[0].addT.value.split('/');
      this.sectorPersona = urlSector[urlSector.length - 1].replace('-', ' ');
    });
    this.personaSvc.getData(this.queryUrlCreativeWorks).subscribe(data => {
      console.log('CreativeWorks: ', data.results.bindings);

      this.creativeWorks = data.results.bindings;
    })
  }

  capitalizeString(str: string): string {
    return str.toLowerCase()
      .trim()
      .split(' ')
      .map(v => v[0].toUpperCase() + v.substr(1))
      .join(' ');
  }

}
