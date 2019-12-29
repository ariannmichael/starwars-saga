import { CharacterFilterOptions } from './../../shared/model/character-filter-options.model';
import { Character } from './../../shared/model/character.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { PeoplePageSummary } from 'src/app/shared/model/people-page-summary';

/**
 * Service to request people data from the api
 */
@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  /** Url base for request people data from the api */
  url = 'https://swapi.co/api/people/';

  private characters = [];

  private filterOptions = new CharacterFilterOptions();

  constructor(private http: HttpClient) {}

  /**
   * Fetch all characters from all pages
   * and all colors options to be shown on the filter
   * (hairColor, skinColor and EyeColor)
   */
  public fetchAllCharactersData(): Observable<Character[]> {
    this.characters = [];
    this.filterOptions.hairColors = new Set<string>();
    this.filterOptions.skinColors = new Set<string>();
    this.filterOptions.eyeColors = new Set<string>();

    return new Observable<Character[]>(subscriber => {
      this.http.get(this.url).pipe(take(1))
        .subscribe((res: PeoplePageSummary) => {
          res.results.map(el => {
            this.characters.push(el);
            this.addOptionsToFilter(el);
          });

          if (res.next) {
            this.fetchNextCharacters(res.next);
          }
        },
          error => console.log(error)
        );

      subscriber.next(this.characters);
      subscriber.complete();
    });
  }

  /** Fetch the characters page by page until there is nextPage */
  private fetchNextCharacters(pageUrl: string) {
    this.fetchByPage(pageUrl).pipe(take(1))
      .subscribe(res => {
        res.results.map(el => {
           this.characters.push(el);
           this.addOptionsToFilter(el);
          });

        // get next pages characters using recursion
        if (res.next) {
          this.fetchNextCharacters(res.next);
        } else {
          return;
        }
      },
        error => console.log(error)
      );
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

  /** Get all colors options to be shown on the filter
   *  (hairColor, skinColor and EyeColor)
   */
  async getCharactersOptions() {
    return this.filterOptions;
  }

  private addOptionsToFilter(el: any) {
    this.filterOptions.hairColors.add(el.hair_color);
    this.filterOptions.skinColors.add(el.skin_color);
    this.filterOptions.eyeColors.add(el.eye_color);
  }

  public fetchByPage(pageUrl: string): Observable<PeoplePageSummary> {
    return this.http.get(pageUrl).pipe(take(1));
  }

  public findCharactersByName(name: string): Observable<PeoplePageSummary> {
    return this.http.get<PeoplePageSummary>(this.url + '?search=' + name);
  }

  public findCharactersById(id: string): Observable<Character> {
    return this.http.get<Character>(this.url + id);
  }
}
