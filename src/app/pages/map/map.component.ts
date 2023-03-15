import { Component } from '@angular/core';
import { GoogleMapsService } from 'src/app/services/google-maps.service';
import * as L from 'leaflet'

import { icon, Marker } from 'leaflet';
import { RedeService } from 'src/app/services/rede.service';
import { ActivatedRoute } from '@angular/router';
const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent {
  private map: any

  private ends = [
    { nome:'Fábio Francisco', contato: '(11) 97852-7227', endereco: {logradouro: 'rua serra talhada', numero: '106', bairro: 'jardim guilhermino', localidade: 'guarulhos', uf: 'sp'} }, 
    { nome:'Ana Paula', contato: '(11) 97214-5005', endereco: {logradouro: 'rua estelina mente de amorin', numero: '201', bairro: 'jardim vera', localidade: 'guarulhos', uf: 'sp'} }, 
    { nome:'Cristiane da Silva', contato: '(11) 91234-5678', endereco: {logradouro: 'rua piracira de melo xavier', numero: '201', bairro: 'jardim normandia', localidade: 'guarulhos', uf: 'sp'} },   
  ]

  private cordenates: any[] = [];
  private enderecos = L.layerGroup(this.cordenates);
  private rede: string

   greenIcon = L.icon({
    iconUrl: 'assets/leaflet/location.png',
    shadowUrl: '',
   })
  constructor(
    private googleMapsService: GoogleMapsService,
    private redeService: RedeService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void{
    this.rede = this.activatedRoute.snapshot.paramMap.get('rede')
    if(this.rede) this.getRede(this.rede)
    this.initMap()
    
  }

  initMap(): void{
    

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 4,
    });

    this.map = L.map('map', {
      center: [ -23.5557714, -46.6395571],
      zoom: 10,
      layers: [tiles, this.enderecos]
    })

    
  }

  setPointInMap(geometry, entity) {
    const cordenate = L.marker([geometry.location.lat, geometry.location.lng]).bindPopup(`<b>${entity.nome}</b><br><br> <b>${entity.contato}</b> `)
    L.layerGroup(this.cordenates).addLayer(cordenate).addTo(this.map )
  }

  getRede(rede){
    this.redeService.getRede(rede).subscribe((res: any) => {
      res.lojas.forEach(loja => {
        console.log(loja.endereco)
        this.googleMapsService.getLatLog(loja.endereco).subscribe(res => {
          console.log(res)
          this.setPointInMap(res.results[0].geometry, loja)
        })
      })
    })
  }
}
