import { Component, OnInit } from '@angular/core';


interface MenuItem{
  nombre:string;
  ruta:string;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styles: [
    `
    li{
      cursor:pointer;
    }
    `
  ]
})
export class MenuComponent {

  menuItem:MenuItem[]=[
    {
      ruta:'/mapas/fullscreen',
      nombre:'FullScreen'
    },
    {
      ruta:'/mapas/zoom-range',
      nombre:'ZoomRange'
    },
    {
      ruta:'/mapas/propiedades',
      nombre:'Propiedades'
    },
    {
      ruta:'/mapas/marcadores',
      nombre:'Marcadores'
    },
  ]
  

}
