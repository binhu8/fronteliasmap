import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RedeService {

  url = 'https://eliasmap.vercel.app/'
  constructor(
    private http: HttpClient
  ) { }

  cadastrarRede(rede){
    return this.http.post(`${this.url}redes`, rede)
  }

  getRede(rede){
    return this.http.get(`${this.url}redes/${rede}`)
  }
}
