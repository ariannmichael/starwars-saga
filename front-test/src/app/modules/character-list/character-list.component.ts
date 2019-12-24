import { Component, OnInit } from '@angular/core';
import { Character } from 'src/app/shared/model/character.model';
import { CharacterService } from 'src/app/core/service/character.service';
import { Observable, Subscriber, concat } from 'rxjs';

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
  endLimit = 9;

  constructor(private characterService: CharacterService) { }

  ngOnInit() {
    this.configLoadingDataStrategy();
  }

  /**
   * Character List will use the following configuration to load data:
   *  - Load the number of characters for the pagination
   *  - Load all the characters
   */
  public configLoadingDataStrategy() {
    concat(
      this.loadAllCharacters$(),
      this.loadNumberOfCharacters$()
    ).subscribe();
  }

  public loadNumberOfCharacters$(): Observable<void> {
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
  public loadAllCharacters$(): Observable<void> {
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
      this.loadCharactersByName$(name).toPromise().then();
    } else {
      this.filteredCharacters = this.charactersList;
      this.numberOfCharactersFiltered = this.numberOfCharacters;
    }
  }

  private loadCharactersByName$(name: string): Observable<void> {
    return new Observable<void>(subscriber => {
      this.characterService.findCharactersByName(name)
        .subscribe(res => {
          this.filteredCharacters = res.results;
          this.numberOfCharactersFiltered = res.count;

          subscriber.next();
          subscriber.complete();
        });
    });
  }


  /** Change the limits to show different characters */
  public changePages(page: number) {
    this.endLimit = 9 * page;
    this.startLimit = this.endLimit - 9 > 0 ? this.endLimit - 9 : 0 ;
  }
}
