import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginModel } from 'src/app/models/modelo-login/login';
import { GeneralLoginService } from 'src/app/services/generalLogin/generallogin.service';
import { PathImagenesService } from 'src/app/services/path-imagenes.service';
import { MensajeLoginComponent } from '../mensaje-login/mensaje-login.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  pathLogoUTM:string;
  piepagina="Flotante";
  usuario_login='';
  contrasena="";
  userLogin:LoginModel={correo:'',contrasena:''};
  constructor(private _pathimagenes:PathImagenesService,public dialog: MatDialog,public snackBar:MatSnackBar,private router:Router,
    private _login:GeneralLoginService) { 
    this.pathLogoUTM=this._pathimagenes.pathlogoutm;
  }

  ngOnInit(): void {
  }

 
  
  ingresarlogin()
  {
    if(this.usuario_login.length==0)
    {
      this.snackBar.openFromComponent(MensajeLoginComponent,{
        data:{
          titulo:'Error.....',
          mensaje:'Ingresar correo y/o contraseña',
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
    if(this.contrasena.length==0)
    {
      this.snackBar.openFromComponent(MensajeLoginComponent,{
        data:{
          titulo:'Error.....',
          mensaje:'Ingresar correo y/o contraseña',
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
  this.userLogin.correo=this.usuario_login;
  this.userLogin.contrasena=this.contrasena;
  let json={usuario:this.userLogin};
  
  this._login.login(json)
  .subscribe((res:any)=>{
    if(res.estado==true)
    {
      this.snackBar.openFromComponent(MensajeLoginComponent,{
        data:{
          titulo:'Bienvenido',
          mensaje:'Bienvenido al Sistema UTMRICB',
         buttonText:'',
         icon:'success'
        },
        duration:1500,
        horizontalPosition:'center',
        verticalPosition:'top',
        panelClass:'success'     
      });

      //guardar en cache
      sessionStorage.setItem('isRedirected','true');
      localStorage.setItem("cedula",res.usuario.cedula);
      this.router.navigate(['/utmricb/principal']);
    }
    if(res.estado==false)
    {
      this.snackBar.openFromComponent(MensajeLoginComponent,{
        data:{
          titulo:'Error.....',
          mensaje:res.mensaje,
         buttonText:'',
         icon:'warning'
        },
        duration:1000,
        horizontalPosition:'end',
        verticalPosition:'bottom',
        panelClass:'error'     
      });
      this.contrasena="";
      return;

    }
  });

    
  }
}