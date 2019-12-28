import { Specie } from './../../shared/model/specie.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpecieService {

  constructor(private http: HttpClient) { }

  public fetchSpecie(url: string): Observable<Specie> {
    return this.http.get<Specie>(url);
  }

}
