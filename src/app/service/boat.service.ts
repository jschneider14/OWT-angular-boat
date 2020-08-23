import { AuthenticationService } from './authentication.service';
import { Boat } from './../entity/boat';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BoatService {

  private baseUrl = 'http://localhost:8080/api/boats';

  constructor(private httpClient: HttpClient, private authService: AuthenticationService) { }

  getBoat(boatId: number): Observable<Boat> {
    const boatUrl = `${this.baseUrl}/${boatId}`;

    return this.httpClient.get<Boat>(boatUrl);
  }

  getBoatList(): Observable<Boat[]> {
    return this.httpClient.get<Boat[]>(this.baseUrl).pipe(
      tap(status => console.log(status)),
      catchError(this.handleError)
    );
  }

  save(theBoat: Boat) {
    return this.httpClient.post<Boat>(this.baseUrl, theBoat).pipe(
      tap(status => console.log('status: ' + status)),
      catchError(this.handleError)
    );
  }

  update(theBoat: Boat) {
    return this.httpClient.put<Boat>(this.baseUrl, theBoat).pipe(
      tap(status => console.log('status: ' + status)),
      catchError(this.handleError)
    );
  }

  delete(boatId: number) {
    return this.httpClient.delete(`${this.baseUrl}/${boatId}`).pipe(
      tap(status => console.log('status: ' + status)),
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error(error);
    return throwError(error);
  }
}
