import { FilterCharacterService } from './../../core/service/filter-character.service';
import { CharacterFilterOptions } from './../../shared/model/character-filter-options.model';
import { Component, OnInit } from '@angular/core';
import { Character } from 'src/app/shared/model/character.model';
import { CharacterService } from 'src/app/core/service/character.service';
import { Observable, Subscriber, concat, forkJoin } from 'rxjs';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss']
})
export class CharacterListComponent implements OnInit {

  /** List of all characters */
  charactersList: Character[];

  /** List of characters returned by the filter */
  filteredCharacters: Character[];

  /** Number of characters for the pagination */
  numberOfCharacters = 0;

  /** Number of characters after filter for the pagination */
  numberOfCharactersFiltered = 0;

  /** Limits to manage the characters to be shown */
  startLimit = 0;
  endLimit = 8;

  constructor(
    private characterService: CharacterService,
    private filterCharacterService: FilterCharacterService
  ) { }

  ngOnInit() {
    this.configLoadingDataStrategy();
  }

  /**
   * Character List will use the following configuration to load data:
   *  - Load the number of characters for the pagination
   *  - Load all the characters
   */
  private configLoadingDataStrategy() {
    concat(
      this.loadAllCharacters$(),
      this.loadNumberOfCharacters$()
    ).toPromise().then();
  }

  private loadNumberOfCharacters$(): Observable<void> {
    return new Observable<void>(subscriber => {
      this.characterService.getNumberOfCharacters(1)
        .subscribe(res => {
          this.numberOfCharacters = res;
          this.numberOfCharactersFiltered = res;

          subscriber.next();
          subscriber.complete();
        });
    });
  }

  /** Load all characters to list from all pages */
  private loadAllCharacters$(): Observable<void> {
    return new Observable<void>(subscriber => {
      this.characterService.fetchAllCharacters()
        .then(characters => {
          this.charactersList = characters;
          this.filteredCharacters = characters;

          subscriber.next();
          subscriber.complete();
        });
    });
  }

  /** Search character base on the input on SearchFilter
   *  in case the name be null, show all characters
   */
  public searchCharactersByName(name: string) {
    if (name.length > 0) {
      this.filteredCharacters = [];
      this.loadCharactersByName(name);
    } else {
      this.filteredCharacters = this.charactersList;
      this.numberOfCharactersFiltered = this.numberOfCharacters;
    }
  }

  private loadCharactersByName(name: string) {
    this.characterService.findCharactersByName(name)
      .subscribe(res => {
        res.results.map(el => this.filteredCharacters.push(el));
        this.numberOfCharactersFiltered = res.count;

        if (res.next) {
          this.loadNextPage(res.next);
        }
      });
  }

  /** Keep loading pages if there is a next page
   *  and getting pages' characters
   */
  private loadNextPage(pageUrl: string) {
    this.characterService.fetchByPage(pageUrl)
      .subscribe(res => {
        res.results.map(el => this.filteredCharacters.push(el));

        if (res.next) {
          this.loadNextPage(res.next);
        } else {
          return;
        }
      });
  }

  /** Filter the list of characters through service, using filter options */
  filterCharactersByOptions(filter: CharacterFilterOptions) {
    this.filteredCharacters = this.charactersList;
    this.numberOfCharactersFiltered = this.filteredCharacters.length;

    this.filterCharacterService.addCharacters(this.filteredCharacters);
    this.filterCharacterService.filterCharacters(filter);
  }


  /** Change the limits to show different characters */
  public changePages(page: number) {
    this.endLimit = 8 * page;
    this.startLimit = this.endLimit - 8 > 0 ? this.endLimit - 8 : 0 ;
  }
}
