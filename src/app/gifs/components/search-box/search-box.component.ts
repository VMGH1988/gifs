import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  template: `
  <h5>Buscar:</h5>
  <input type="text" class="form-control" placeholder="Buscar gifs..." (keyup.enter)="searchTag()" #txtTagInput>

  `,

})
export class SearchBoxComponent {
  //ponemos esto para coger el valor del html del input y tenerlo como una variable publica
  @ViewChild('txtTagInput')
  public tagInput!: ElementRef<HTMLInputElement>; // se pone ! delante de : para decirle que siempre va a tener un valor

  // en el constructor se inyecta el servicio
  constructor(private gifsService: GifsService){};

  searchTag(){
    const newTag = this.tagInput.nativeElement.value;
    this.gifsService.searchTag(newTag);
    this.tagInput.nativeElement.value=''; // para limpiar la caja de texto del buscador
  }
}
