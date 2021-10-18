import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

interface MarcadorColor{
  color:string;
  marker?:mapboxgl.Marker;
  centro?:[number,number];
}

@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styles: [
    `
    .list-group{
      position:fixed;
      right:20px;
      top:20px;
      z-index:999;      
    }
    li{
      cursor:pointer;
    }
    .mapa-container {
      width:100%;
      height:100%;
    }`
  ]
})
export class MarcadoresComponent implements AfterViewInit {

  @ViewChild('mapa') divMapa!:ElementRef;
  mapa!:mapboxgl.Map;
  zoomLevel:number=15;
  center:[number,number]=[-4.490295,36.740837];

  marcadores:MarcadorColor[]=[];

  constructor() { }
  ngAfterViewInit(): void {
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center:this.center,
      zoom:this.zoomLevel
    });
    this.leerLocalStorage();
   // const marker = new mapboxgl.Marker()
   //   .setLngLat(this.center)
   //   .addTo(this.mapa);
  }

  irMarcador(m:mapboxgl.Marker){
    
    this.mapa.flyTo({
      center:m.getLngLat()
    })
  }

  agregarMarcador(){
    const color = "#xxxxxx".replace(/x/g, y=>(Math.random()*16|0).toString(16));
    const nuevoMarker = new mapboxgl.Marker({
      draggable:true,
      color:color
    })
      .setLngLat(this.center)
      .addTo(this.mapa);
    
    this.marcadores.push({color:color,marker:nuevoMarker});
    this.guardarMarcadoresLocalStorage();
    nuevoMarker.on('dragend',()=>{
      this.guardarMarcadoresLocalStorage();
    })

  }

  guardarMarcadoresLocalStorage(){

    const lngLatArr:MarcadorColor[]=[];
    this.marcadores.forEach(m=>{
      const color=m.color;
      const {lng,lat}=m.marker!.getLngLat();
      lngLatArr.push({
        color:color,
        centro:[lng,lat]
      });
    });
    localStorage.setItem('marcadores',JSON.stringify(lngLatArr));
  }

  leerLocalStorage(){
    if(!localStorage.getItem('marcadores')){
      return;
    }
    const lngLatArr:MarcadorColor[]= JSON.parse(localStorage.getItem('marcadores')!);

    lngLatArr.forEach(m=>{
      const nuevoMarcador = new mapboxgl.Marker({
        color:m.color,
        draggable:true
      })
      .setLngLat(m.centro!)
      .addTo(this.mapa);
      this.marcadores.push({
        marker:nuevoMarcador,
        color:m.color
      })

      nuevoMarcador.on('dragend',()=>{
        this.guardarMarcadoresLocalStorage();
      })
    });
    
  }
  borrarMarcador(indice:number){
    
    this.marcadores[indice].marker?.remove();
    this.marcadores.splice(indice,1);
    this.guardarMarcadoresLocalStorage();

  }
  
}
