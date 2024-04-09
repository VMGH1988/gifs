import { Component } from '@angular/core';
import { GifsService } from '../../../gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebars',
  templateUrl: './sidebars.component.html',
  styleUrl: './sidebars.component.css'
})
export class SideBarsComponent {

  // volvemos a inyectar de forma privada el servicio y luego para poder usarlo hay que hacerle un get
  constructor(private gifsService: GifsService){}

  get tags(){
    return this.gifsService.tagsHistory;
  }

  searchTag(tag:string){
    this.gifsService.searchTag(tag);
  }
}
