import { Starship } from './../../shared/model/starship.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/**
 * Service to starships films data from the api
 */
@Injectable({
  providedIn: 'root'
})
export class StarshipService {

  constructor(private http: HttpClient) { }

  public fetchStarship(url: string): Observable<Starship> {
    return this.http.get<Starship>(url);
  }

}
