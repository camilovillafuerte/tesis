import { BaseUrlService } from './base/base-url.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BecasNivel } from '../models/becasnivel';

@Injectable({
  providedIn: 'root'
})
export class BecasnivelService {
  
 
 
  constructor(
    private http:HttpClient,
    private _base:BaseUrlService
    ) { }
  
  getBecas():Observable<any>{
    let url:string = this._base.getUrlApi() + 'becas2'
    return this.http.get<any>(url);
  }
  
  getBecasNivelbody():Observable<any>{
    let url:string = this._base.getUrlApi() + 'becas_body2'; 
    return this.http.get<any>(url);
  }

  //agregar categoria becas
  addcategoriabecas(data:any)
  {
    let url:string = this._base.getUrlApi() + 'pagina-becas/add';
    return this.http.post(url,data);
  }

  updatecategoriabecasestado(data:any){
    let url:string = this._base.getUrlApi() + 'pagina-becas/update/estado';
    return this.http.put(url,data);
  }
  updatecategoriabecasNombre(data:any){
    let url:string = this._base.getUrlApi() + 'pagina-becas/update';
    return this.http.put(url,data);
  }

  //becas nivel body 
  getBecasNivelBodyId(id:string):Observable<any>
  {
    let url:string = this._base.getUrlLocalApi() + 'pagina-becas-body/get/'+id; 
    return this.http.get<any>(url);
  }


}
