import { IngresarConveniosPaginasComponent } from './paginas/ingresar-convenios-paginas/ingresar-convenios-paginas.component';
import { MostrarConveniosPaginasComponent } from './paginas/mostrar-convenios-paginas/mostrar-convenios-paginas.component';
import { BaseconveniosComponent } from './baseconvenios/baseconvenios.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IngresarPlantillaConveniosPaginasComponent } from './paginas/ingresar-plantilla-convenios-paginas/ingresar-plantilla-convenios-paginas.component';

const routes: Routes = [
  {
    path: '', component: BaseconveniosComponent,
    children:[
      {
        path:'',
        redirectTo: 'mostrarconvenios', pathMatch: 'full'
      },
      {
        path: 'mostrarconvenios',component:MostrarConveniosPaginasComponent
      },
      {
        path:'ingresarconvenios',component:IngresarConveniosPaginasComponent
      },
      {
        path:'ingresarplantilla',component:IngresarPlantillaConveniosPaginasComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConveniosRoutingModule { }