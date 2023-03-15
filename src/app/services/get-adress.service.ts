import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetAdressService {

  constructor(
    private http: HttpClient
  ) { }

  getAdressByCEP(cep): Observable<any> {
    return this.http.get(`https://viacep.com.br/ws/${cep}/json/`)
  }
}
