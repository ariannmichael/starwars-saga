import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PeoplePageSummary } from 'src/app/shared/model/people-page-summary';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  firstPageUrl = 'https://swapi.co/api/people/?page=1';

  constructor(private http: HttpClient) { }

  public fetchCharacters(): Observable<PeoplePageSummary> {
    return this.http.get<PeoplePageSummary>(this.firstPageUrl);
  }

  public fetchOthersCharacters(url): Observable<PeoplePageSummary> {
    return this.http.get<PeoplePageSummary>(url);
  }

  // public fetchCharacters(): Observable<Character[]> {
  //   return this.http.get(this.url).pipe(map(res => res.results));
  // }

}
