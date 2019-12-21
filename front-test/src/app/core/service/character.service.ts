import { Character } from './../../shared/model/character.model';
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

  public fetchOthersCharacters(otherUrl: string): Observable<PeoplePageSummary> {
    return this.http.get<PeoplePageSummary>(otherUrl);
  }

  public findCharactersByName(name: string) {
    return this.http.get<PeoplePageSummary>(this.url + '?search=' + name);
  }

  public findCharactersById(id: string) {
    return this.http.get<Character>(this.url + id);
  }

}
