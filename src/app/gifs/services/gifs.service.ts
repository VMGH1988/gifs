//a-service
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

const GIPHY_APY_KEY = '1NSkqEXaWZ0T3YCoiLlQkYJ0PAEILxT5';

@Injectable({providedIn: 'root'}) // esto es para decir que es injectable en todo al poner root
export class GifsService {

  public gifList: Gif[] = [];

  private _tagsHistory: string[] = [];
  private apikey: string = GIPHY_APY_KEY;
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs'; // para que la url de abajo no sea tan larga

  constructor(private http: HttpClient) {
    this.loadLocalStorage();
   }

  get tagsHistory(){
    return [...this._tagsHistory]; // ... para crear una referencia del objeto (no es obligatorio)
  }

  //metodo para validar y organizar la entrada del buscador
  private organizeHistory(tag: string){
    tag = tag.toLocaleLowerCase(); // para meterlo en el array en minuscula

    if(this._tagsHistory.includes(tag)){
      this._tagsHistory = this._tagsHistory.filter((oldTag)=> oldTag !== tag); // para validar que no se repiten los nombres introducidos
    }

    this._tagsHistory.unshift(tag); // unshift es para añadir al inicio, osea el tag lo añade al inicio
    this._tagsHistory = this.tagsHistory.splice(0,10); // para que solo muestre los 10 ultimmos nombres introducidos
    this.saveLocalStorage();

  }
  //para guardar los datos en el local
  private saveLocalStorage():void{
    localStorage.setItem('history', JSON.stringify(this._tagsHistory)); // stringify para poner el objeto en string

  }
//para coger los datos en el local
  private loadLocalStorage():void{
    if(!localStorage.getItem('history')) return;

    this._tagsHistory= JSON.parse(localStorage.getItem('history')!); //hacer el parseo contrario y se pone ! para decir que no es nulo
    if(this._tagsHistory.length===0) return; // por si alguien borra el localstorage
    this.searchTag(this._tagsHistory[0]); // esto es para que se muestren las imagenes del de arriba al abrir la pagina
  }





  // aqui se pueden hacer las validaciones del buscador
 searchTag(tag:string):void{
    //para validar que tenga que tener algun valor
    if(tag.length === 0)return;
    this.organizeHistory(tag); // para llamar al metodo anterior

    /* una forma de hacerlo
        // coger la url de la peticion a giphy que nos ha dado postman (hacer una peticcion http)
        fetch('/search?api_key=1NSkqEXaWZ0T3YCoiLlQkYJ0PAEILxT5&q=valorant&limit=10')
        .then(resp => resp.json()) // serializar la respuesta del fetch en un json
        .then(data => console.log(data)); //mostrar la data

        */
    //hacer la peticion a la api de giphy

    const params = new HttpParams()
    .set('api_key', this.apikey)
    .set('limit', 10)
    .set('q', tag)


    this.http.get<SearchResponse>(`${this.serviceUrl}/search`,{params})
    .subscribe((resp) =>{
      this.gifList = resp.data;
      //console.log({gifs: this.gifList});
    });

  }

}
