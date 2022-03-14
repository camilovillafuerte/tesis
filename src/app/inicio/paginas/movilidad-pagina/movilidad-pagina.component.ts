import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-movilidad-pagina',
  templateUrl: './movilidad-pagina.component.html',
  styleUrls: ['./movilidad-pagina.component.css']
})
export class MovilidadPaginaComponent implements OnInit {
  piepagina="Normal";
  constructor() { sessionStorage.setItem('isRedirected','true');}

  ngOnInit(): void {
  }

}
