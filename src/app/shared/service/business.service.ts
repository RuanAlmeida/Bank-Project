import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBusiness } from 'src/app/shared/domain/ibusiness.model';
import { ConstantsUltis } from "src/app/shared/utils/ConstantsUltis";

@Injectable({
  providedIn: 'root'
})
export class BusinessService {

  constructor(private http: HttpClient) { }


  findAll(): Observable<IBusiness[]>{
    return this.http.get<IBusiness[]>(ConstantsUltis.FIND_ALL_BUSINESS);
  }

  findOne(id: number): Observable<IBusiness>{
    return this.http.get<IBusiness>(`${ConstantsUltis.FIND_ONE_BUSINESS}/${id}`);
  }


  update(iBusiness: IBusiness){
    return this.http.put<IBusiness>(`http://localhost:3000/ibusiness/${iBusiness.id}`, iBusiness);
  }

}
