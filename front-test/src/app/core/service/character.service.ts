import { Character } from './../../shared/model/character.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PeoplePageSummary } from 'src/app/shared/model/people-page-summary';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  url = 'https://swapi.co/api/people/';

  private characters = [];

  constructor(private http: HttpClient) {}

  /** Fetch all characters from all pages */
  async fetchAllCharacters() {
    this.http.get(this.url)
      .subscribe((res: PeoplePageSummary) => {
        res.results.map(el => this.characters.push(el));

        if (res.next) {
          this.fetchNextCharacters(res.next);
        }
      });

    return this.characters;
  }

  private fetchNextCharacters(pageUrl: string) {
    this.fetchByPage(pageUrl)
      .subscribe(res => {
        res.results.map(el => this.characters.push(el));

        if (res.next) {
          this.fetchNextCharacters(res.next);
        } else {
          return;
        }
      });
  }

  /** Fetch all characters from page */
  private fetchCharacters(pageIndex: string): Observable<Character[]> {
    return this.http.get(this.url + '?page=' + pageIndex)
      .pipe(
        map((res: any) => {
          return res.results;
        })
      );
  }

  /** Fetch total number of characters */
  public getNumberOfCharacters(pageIndex: number) {
    return this.http.get(this.url + '?page=' + pageIndex)
      .pipe(map((res: any) => res.count));
  }

  public fetchByPage(pageUrl: string): Observable<PeoplePageSummary> {
    return this.http.get(pageUrl);
  }

  public findCharactersByName(name: string): Observable<PeoplePageSummary> {
    return this.http.get<PeoplePageSummary>(this.url + '?search=' + name);
  }

  public findCharactersById(id: string): Observable<Character> {
    return this.http.get<Character>(this.url + id);
  }

}
