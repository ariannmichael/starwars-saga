import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Film } from '../../shared/model/film.model';

@Injectable({
  providedIn: 'root'
})
export class FilmsService {

  constructor(private http: HttpClient) { }

  public fetchFilms(url: string): Observable<Film> {
    return this.http.get<Film>(url);
  }

}
