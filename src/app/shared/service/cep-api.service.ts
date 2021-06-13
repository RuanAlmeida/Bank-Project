import { ViaCepObject } from './../domain/via-cep-object.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConstantsUltis } from '../utils/ConstantsUltis';


@Injectable({
  providedIn: 'root'
})
export class CepApiService {

  constructor(private http: HttpClient) { }


  getCep(cep: string): Observable<ViaCepObject>{
    return this.http.get<ViaCepObject>(`${ConstantsUltis.PATH_VIA_CEP}${cep}/json/`);
  }
}
