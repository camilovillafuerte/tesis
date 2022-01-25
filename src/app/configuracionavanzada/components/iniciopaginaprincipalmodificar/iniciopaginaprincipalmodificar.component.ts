import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Interfaz_contenido } from 'src/app/models/Interfaz_contenido.model';
import { GeneralService } from 'src/app/services/generalget/general.service';

@Component({
  selector: 'app-iniciopaginaprincipalmodificar',
  templateUrl: './iniciopaginaprincipalmodificar.component.html',
  styleUrls: ['./iniciopaginaprincipalmodificar.component.css']
})
export class IniciopaginaprincipalmodificarComponent implements OnInit {
  // formGroup
  myform:FormGroup;

  //listaInterfaz
  listacarrosel:Interfaz_contenido[]=[];
  listainterfaz:Interfaz_contenido[]=[];

  loading=true;
  verificar=true;
  
  constructor(private ingresar:FormBuilder,private _general:GeneralService) { 
    this.myform=ingresar.group({
      imagen:ingresar.array([]),
      eliminar:ingresar.array([])
    });
  }

  ngOnInit(): void {
    this.getPaginas()
  }
  getPaginas(){
    this._general.getTipoPagina("Inicio")
    .subscribe((res:any) => {
      this.listainterfaz=res;
     //console.log(this.listainterfaz);
     
     this.loading=false;
     this.separarcarosel(this.listainterfaz);
    });
  }
  separarcarosel(original:Interfaz_contenido[])
  {
    original.forEach((item:Interfaz_contenido)=>{
      if(item.interfaz.nombre=="Carrusel")
      {
        if(item.estado=="A")
        {
          this.listacarrosel.push(item);
        } 
      }
    });
    console.log(this.listacarrosel);
    

    if(this.listacarrosel.length==0)
    {
      this.verificar=false;

    }
    else
    {
      this.listacarrosel.forEach((item:Interfaz_contenido)=>{
          const imagen_publi=this.ingresar.group({
           id:item.id,
           nombre:item.nombre,
           descripcion:item.descripcion,
           urlimagen:item.urlimagen,
           file:new File([""],"")
          });
          this.imagen.push(imagen_publi);
      });

      console.log(this.myform.get('imagen')?.value[0]);
    }

  }
  //modelo
  get imagen(){
    return this.myform.get('imagen') as FormArray;
  }
  getImagen(index:number)
  {
    var url=this.imagen.controls[index].value.urlimagen;
    return url;

  }

}
