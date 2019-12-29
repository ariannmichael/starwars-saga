import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Planet } from 'src/app/shared/model/planet.model';


/**
 * Service to request planets data from the api
 */
@Injectable({
  providedIn: 'root'
})
export class PlanetService {

  constructor(private http: HttpClient) { }

  public fetchStarship(url: string): Observable<Planet> {
    return this.http.get<Planet>(url);
  }

}
