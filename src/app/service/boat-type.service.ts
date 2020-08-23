import { BoatType } from './../entity/boat-type';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BoatTypeService {

  private baseUrl = 'http://localhost:8080/api/boat-types';

  constructor(private httpClient: HttpClient) { }

  getBoatTypeList(): Observable<BoatType[]> {
    return this.httpClient.get<BoatType[]>(this.baseUrl);
  }
}
