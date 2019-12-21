import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PeoplePageSummary } from 'src/app/shared/model/people-page-summary';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  url = 'https://swapi.co/api/people/';

  constructor(private http: HttpClient) { }

  public fetchFirstCharacters(): Observable<PeoplePageSummary> {
    return this.http.get<PeoplePageSummary>(this.url + '?page=1');
  }

  public fetchOthersCharacters(otherUrl): Observable<PeoplePageSummary> {
    return this.http.get<PeoplePageSummary>(otherUrl);
  }

  /** Find characters based on the name */
  public findCharacters(name: string) {
    return this.http.get<PeoplePageSummary>('https://swapi.co/api/people/?search=' + name);
  }

}
