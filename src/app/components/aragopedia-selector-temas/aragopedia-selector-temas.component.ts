import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { dateFormat } from 'dc';
import { AragopediaService } from '../aragopedia-tabla-datos/aragopediaService';
import { ComarcasComponent } from './location/comarcas/comarcas.component';
import { LocationComponent } from './location/location.component';
import { MunicipiosComponent } from './location/municipios/municipios.component';
import { ProvinciasComponent } from './location/provincias/provincias.component';

@Component({
  selector: 'app-aragopedia-selector-temas',
  templateUrl: './aragopedia-selector-temas.component.html',
  styleUrls: ['./aragopedia-selector-temas.component.scss']
})
export class AragopediaSelectorTemasComponent implements OnInit {

  constructor(public aragopediaSvc: AragopediaService) { }

  @ViewChild(LocationComponent) location: any;


  temp = undefined;

  formGroup!: FormGroup;

  queryTemas!: string;
  temasControl = new FormControl('');
  selectedTema: any = '';

  selectedProvincia: any = '';
  selectedComarca: any = '';
  selectedMunicipio: any = '';
  unique: any;
  temas!: any;

  temasComunidad = [{}];
  temasProvincia = [{}];
  temasComarca = [{}];
  temasMunicipio = [{}];

  queryUrlWikiData!: string;

  queryUrlComarcasId!: string
  queryUrlMunicipiosId!: string;

  showTemas: any;



  ngOnInit(): void {


    this.queryTemas = "https://opendata.aragon.es/solrWIKI/informesIAEST/select?q=*&rows=2000&omitHeader=true&wt=json";

    this.aragopediaSvc.getData(this.queryTemas).subscribe((data: any) => {
      this.temas = data.response.docs;
      this.unique = [...new Set(data.response.docs.map((item: { Descripcion: any; }) => item.Descripcion))];

      // Construcción temas por tipo de territorio
      this.temas.forEach((tema: any) => {
        if (tema.Tipo === 'A') {
          this.temasComunidad.push(tema)
        } else if (tema.Tipo === 'TP') {
          this.temasProvincia.push(tema)
        } else if (tema.Tipo === 'TC') {
          this.temasComarca.push(tema)
        } else if (tema.Tipo === 'TM') {
          this.temasMunicipio.push(tema);
        }
      });
    });


  }

  submit() {
    this.selectedProvincia = this.location.idProvincia;
    this.selectedComarca = this.location.idComarca;
    this.selectedMunicipio = this.location.idMunicipio;

    console.log('Provincia: ', this.selectedProvincia, 'Comarca: ', this.selectedComarca, 'Municipio: ', this.selectedMunicipio);
  }

  generateTemas() {
    this.selectedProvincia = this.location.idProvincia;
    this.selectedComarca = this.location.idComarca;
    this.selectedMunicipio = this.location.idMunicipio;

    if (this.selectedProvincia !== undefined) {
      this.showTemas = this.temasProvincia;
      console.log(this.showTemas === this.temasProvincia);

      console.log(this.selectedProvincia);

    } else if (this.selectedComarca !== undefined) {
      this.showTemas = this.temasComarca;
      console.log(this.showTemas === this.temasComarca);
      console.log(this.selectedComarca);


    } else if (this.selectedMunicipio !== undefined) {
      this.showTemas = this.temasMunicipio;
      console.log(this.showTemas === this.temasMunicipio);

      console.log(this.selectedMunicipio);

    }
    // else {
    //   this.showTemas = [{ DescripcionMejorada: 'Debes seleccionar una entidad territorial' }];
    // }
  }



}