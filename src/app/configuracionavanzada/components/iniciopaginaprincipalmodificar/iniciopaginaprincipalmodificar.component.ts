import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { image } from 'html2canvas/dist/types/css/types/image';
import { MensajeconfiguracionComponent } from 'src/app/configuracion/components/mensajeconfiguracion/mensajeconfiguracion.component';
import { Interfaz_contenido } from 'src/app/models/Interfaz_contenido.model';
import { GeneralService } from 'src/app/services/generalget/general.service';
import { PathImagenesService } from 'src/app/services/path-imagenes.service';
//Alertas
import Swal from 'sweetalert2';
import 'animate.css';
import { GeneralLoginService } from 'src/app/services/generalLogin/generallogin.service';

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

  //id carrosel
  id=0;

  //usuario
  cedula:string;
  usuario_id:string="";
  

  //path imagen
  pathimagendefecto="";

  //boton
  botonvista=false;
  constructor(private ingresar:FormBuilder,private _general:GeneralService,private _pathimagenes:PathImagenesService,public snackBar:MatSnackBar,private _login:GeneralLoginService) { 
    this.myform=ingresar.group({
      imagen:ingresar.array([]),
      eliminar:ingresar.array([])
    });
    this.pathimagendefecto=_pathimagenes.pathimagendefecto;
    this.cedula="";
    var cedula1;
    cedula1=localStorage.getItem("cedula") as string;  
    this.cedula=cedula1;
  }

  ngOnInit(): void {
    this.getusuario();
    this.getPaginas()
  }

  getusuario(){
    this._login.getusuariosearch(this.cedula)
    .subscribe((res:any) => {
      //this.loading=false;
      // console.log(res);
      this.usuario_id=res.usuario.id;   
    });
  }
  getPaginas(){
    this._general.getTipoPagina("Inicio")
    .subscribe((res:any) => {
    this.listainterfaz=res;
    // console.log(this.listainterfaz);
     this.id=this.listainterfaz[0].interfaz.id;
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
    
    

    if(this.listacarrosel.length==0)
    {
      this.verificar=false;

    }
    else
    {
      this.listacarrosel.forEach((item:Interfaz_contenido)=>{
          const imagen_publi=this.ingresar.group({
          id:item.id,
          id_interfaz:item.interfaz.id,
          usuario_id:this.usuario_id,
           nombre:[item.nombre,Validators.required],
           descripcion:[item.descripcion,Validators.required],
           urlimagen:item.urlimagen,
           file:new File([""],""),
           verificar:false
          });
          this.imagen.push(imagen_publi);
      });
    }

  }
  //modelo
  get imagen(){
    return this.myform.get('imagen') as FormArray;
  }

  get eliminar(){
    return this.myform.get('eliminar') as FormArray;
  }
  getImagen(index:number)
  {
    var url=this.imagen.controls[index].value.urlimagen;
    return url;

  }

  agregarCarrosel(){
    this.verificar=true;
    const imagen_iniciO=this.ingresar.group({
     id:0,
     id_interfaz:this.id,
     usuario_id:this.usuario_id,
     nombre:['',Validators.required],
     descripcion:['',Validators.required],
     urlimagen:this.pathimagendefecto,
     file:new File([""],""),
     verificar:false
    });

    this.imagen.push(imagen_iniciO);
  }

  fileEvent(event:any,id:number)
  {
     const i=this.myform.get('imagen') as FormArray;
    const foto=new Image();
    const archivoCapturado=event.target.files[0]; 
    if(archivoCapturado.type=='image/png'|| archivoCapturado.type=='image/jpeg')
    {
   
     let base=this.toBase64(archivoCapturado);
     base.then((imagen1:any)=>{
      foto.src=imagen1;
      foto.onload=function(){
        const imgWidth = foto.naturalWidth;
        const imgHeight = foto.naturalHeight;
        
        if(imgWidth==1200&&imgHeight==500)
        {
           i.controls[id].patchValue({
            verificar:true,
            file:archivoCapturado,
            urlimagen:imagen1
           })
             
        }
        else
        {
          Swal.fire({
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            },
            title:'Error.. Solo se puede subir imagenes de dimensiones 1200x500',
            icon:'warning'
          });
          return;
           
        }
      }
     
     });

    }
    else
    {
      Swal.fire({
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        },
        title:'Error.. Solo se puede subir imagenes',
        icon:'warning'
      });
      return;
    }
    

  }
  toBase64 = (file: File) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
  
  eliminarCard(id:number)
  {
    
    if(this.imagen.controls[id].value.id!=0)
    {
      const eliminar_card=this.ingresar.group({
       id:this.imagen.controls[id].value.id,
       id_interfaz:this.id,
      });
      this.eliminar.push(eliminar_card);
    }
    this.imagen.removeAt(id);
    if(this.myform.get('imagen')?.value.length==0)
    {
      this.verificar=false;

    }
  }
 //botones

  guardar(){
    
      
    for(var i=0;i<this.imagen.length;i++)
    {
      if(this.imagen.controls[i].value.id==0)
      {
        if(this.imagen.controls[i].value.urlimagen==this.pathimagendefecto)
        {
          this.snackBar.openFromComponent(MensajeconfiguracionComponent,{
            data:{
              titulo:'Error.....',
              mensaje:"Ingresar una imagen",
             buttonText:'',
             icon:'warning'
            },
            duration:1000,
            horizontalPosition:'end',
            verticalPosition:'bottom',
            panelClass:'error'
          });
          return;

        }

        if(this.imagen.controls[i].value.nombre.length==0 || this.imagen.controls[i].value.descripcion.length==0 )
        {
          this.snackBar.openFromComponent(MensajeconfiguracionComponent,{
            data:{
              titulo:'Error.....',
              mensaje:"Faltas datos!!!!",
             buttonText:'',
             icon:'warning'
            },
            duration:1000,
            horizontalPosition:'end',
            verticalPosition:'bottom',
            panelClass:'error'
          });
          return;

        }

      }
      else
      {
        if(this.imagen.controls[i].value.nombre.length==0 || this.imagen.controls[i].value.descripcion.length==0 )
        {
          this.snackBar.openFromComponent(MensajeconfiguracionComponent,{
            data:{
              titulo:'Error.....',
              mensaje:"Faltas datos!!!!",
             buttonText:'',
             icon:'warning'
            },
            duration:1000,
            horizontalPosition:'end',
            verticalPosition:'bottom',
            panelClass:'error'
          });
          return;
        }

      }
    }

    Swal.fire({
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      },
      title: 'Esta seguro que desea Guardar...??',
      icon: 'warning',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      denyButtonText: `No guardar`,
     
    }).then((result)=>{
      var con=0;
      if(result.isConfirmed)
      {
        var numero=0;
        for(var i=0;i<this.imagen.length;i++)
        {
          con++;
          if(this.imagen.controls[i].value.verificar==true)
          { 
            const formData = new FormData();
            formData.append('img_carrusel', this.imagen.controls[i].value.file);
            var base64=this.imagen.controls[i].value.file;
            
            this._general.subirImagenCarroselftp(formData)
            .subscribe((res:any)=>{
              if(res.estado==true)
              {
                var url=res.imagen;
                var url1=url.replace(' ','%20');
                for(var j=0;j<this.imagen.length;j++)
                {
                  if(base64==this.imagen.controls[j].value.file)
                  {
                    this.imagen.controls[j].patchValue({
                    urlimagen:url1
                  });
                  console.log(this.imagen.controls[j].value);
                  numero++;
                  }
                }
               //console.log(this.imagen.value);
               
                
              }
            });
            console.log(numero);
            
          }
        }

      }
      else if(result.isDenied)
      {
        Swal.fire({
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          },
          title:'Se cancelo la operacion',
          icon:'warning'
        })
      }
    })

    // if(con==this.imagen.length)
    //     {
          // console.log(this.myform.value);
        // }


  }
  


}
