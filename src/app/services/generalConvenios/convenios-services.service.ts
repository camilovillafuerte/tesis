import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseUrlService } from '../base/base-url.service';

@Injectable({
  providedIn: 'root'
})
export class ConveniosServicesService {

  constructor(
    private http:HttpClient,
    private _base:BaseUrlService
  ) { }

  getconveniosEspecificos():Observable<any>{
    let url:string = this._base.getUrlApi() + 'convenio-especifico/get';
    return this.http.get<any>(url);
  }

  addconveniosEspecificos(data:any)
  {
    let url:string = this._base.getUrlApi() + 'convenio-especifico/crear';
    return this.http.post(url,data);
  }

  getclausulas():Observable<any>
  {
    let url:string = this._base.getUrlApi() + 'clausulas-new';
    return this.http.get<any>(url);
  }

  addclausulas(data:any)
  {
    let url:string = this._base.getUrlApi() + 'clausulas-new';
    return this.http.post(url,data);
  }

  getconveniostipo(tipo:string):Observable<any>{
    let url:string = this._base.getUrlApi() + 'convenio-new/'+tipo;
    return this.http.get<any>(url);
  }


  getfirmaEmisor():Observable<any>{
    let url:string = this._base.getUrlApi() + 'firma-emisor-new';
    return this.http.get<any>(url);
  }

  getfirmaReceptor():Observable<any>{
    let url:string = this._base.getUrlApi() + 'firma-receptor-new';
    return this.http.get<any>(url);

  }
  
}