import { PathImagenesService } from 'src/app/services/path-imagenes.service';
import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/generalget/general.service';
import { Interfaz_contenido } from 'src/app/models/Interfaz_contenido.model';

@Component({
  selector: 'app-movilidad-informacion',
  templateUrl: './movilidad-informacion.component.html',
  styleUrls: ['./movilidad-informacion.component.css']
})
export class MovilidadInformacionComponent implements OnInit {
  pathmovilidad:string;
  loading=true;
  listainterfaz:Interfaz_contenido[]=[];
  listaobjetivo:Interfaz_contenido[]=[];
  listaprograma:Interfaz_contenido[]=[];
  listabeneficios:Interfaz_contenido[]=[];
  listareglamento:Interfaz_contenido[]=[];

  constructor(private path:PathImagenesService, private _general:GeneralService) { 
    this.pathmovilidad=path.pathimagenmovilidad;

  }

  ngOnInit(): void {
    this.getPaginas();
  }

  getPaginas(){
    this._general.getTipoPagina("Movilidad")
    .subscribe((res:any) => {
      this.listainterfaz=res;
      this.loading=false;
      this.separarObjetivo(this.listainterfaz);
      this.separarBeneficios(this.listainterfaz);
     
    })
  }

  separarObjetivo(original:Interfaz_contenido[])
  {
    original.forEach((item:Interfaz_contenido)=>{
      if(item.interfaz.nombre=="Objetivo-Programa"){
         if(item.nombre=="Objetivo General")
         {
           if(item.estado=="A"){
            this.listaobjetivo.push(item);
           }
         }
         if(item.nombre=="Programa de movilidad académica")
         {
          if(item.estado=="A"){ 
            this.listaprograma.push(item);
          }
         }
      }
    });
  }

  separarBeneficios(original:Interfaz_contenido[])
  {
    original.forEach((item:Interfaz_contenido)=>{
      if(item.interfaz.nombre=="Beneficios-Reglamento"){
    if(item.nombre=="Beneficios")
    {
      if(item.estado=="A"){
        this.listabeneficios.push(item)
      }
    }
    if(item.nombre=="Reglamento")
    {
      if(item.estado=="A"){
        this.listabeneficios.push(item)
      }
    }
  }
    });
  }
}