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

  constructor(private http: HttpClient) {}

  /** Fetch all characters from all pages */
  async fetchAllCharacters() {
    const characters = [];
    let pagesNumbers = 0;

    this.getNumberOfCharacters(1).subscribe((res: any) => {
      pagesNumbers = Math.ceil(res / 10);

      for (let i = 1; i <= pagesNumbers; i++) {
        this.fetchCharacters(i)
          .subscribe(data => {
              data.map(character => characters.push(character));
          });
      }

    });

    return characters;
  }

  /** Fetch all characters from page */
  private fetchCharacters(pageIndex: number): Observable<Character[]> {
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

  public findCharactersByName(name: string): Observable<PeoplePageSummary> {
    return this.http.get<PeoplePageSummary>(this.url + '?search=' + name);
  }

  public findCharactersById(id: string): Observable<Character> {
    return this.http.get<Character>(this.url + id);
  }

}
