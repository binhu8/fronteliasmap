import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GoogleMapsService {

  constructor(
    private http: HttpClient
  ) { }

  getLatLog(adress): Observable<any> {
    return this.http.get(`https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyCQvbkhBtOx5VKWDCn8V_5IB-zwGFAJIdg&address=${adress.logradouro}+${adress.numero}+${adress.bairro}+${adress.localidade}+${adress.uf}`)
  }
}
