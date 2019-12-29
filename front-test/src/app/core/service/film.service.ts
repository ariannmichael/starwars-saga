import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Film } from '../../shared/model/film.model';

/**
 * Service to request films data from the api
 */
@Injectable({
  providedIn: 'root'
})
export class FilmsService {

  constructor(private http: HttpClient) { }

  public fetchFilms(url: string): Observable<Film> {
    return this.http.get<Film>(url);
  }

}
