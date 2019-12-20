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

  public fetchCharacters(): Observable<PeoplePageSummary> {
    return this.http.get<PeoplePageSummary>(this.url + '?page=1');
  }

  public fetchOthersCharacters(url): Observable<PeoplePageSummary> {
    return this.http.get<PeoplePageSummary>(url);
  }

  /** Find characters based on the name */
  public findCharacters(name: string) {
    return this.http.get<PeoplePageSummary>('https://swapi.co/api/people/?search=' + name);
  }

  // public fetchCharacters(): Observable<Character[]> {
  //   return this.http.get(this.url).pipe(map(res => res.results));
  // }

}
