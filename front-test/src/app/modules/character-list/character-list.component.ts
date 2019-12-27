import { CharacterFilterOptions } from './../../shared/model/character-filter-options.model';
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
  endLimit = 8;

  constructor(private characterService: CharacterService) { }

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

  filterCharactersByOptions(filter: CharacterFilterOptions) {
    console.log(filter);

    if (this.isFilterNull(filter)) {
      this.filteredCharacters = this.charactersList;
      this.numberOfCharactersFiltered = this.filteredCharacters.length;
      return;
    }

    if (filter.height) {
      this.filteredCharacters = this.filteredCharacters.filter(character => {
        return character.height === filter.height.toString();
      });
    }

    if (filter.mass) {
      this.filteredCharacters = this.filteredCharacters.filter(character => {
        return character.mass === filter.mass.toString();
      });
    }

    if (filter.hairColors) {
      this.filteredCharacters = this.filteredCharacters.filter(character => {
        return character.hair_color === filter.hairColors.toString();
      });
    }

    if (filter.skinColors) {
      this.filteredCharacters = this.filteredCharacters.filter(character => {
        return character.skin_color === filter.skinColors.toString();
      });
    }

    if (filter.eyeColors) {
      this.filteredCharacters = this.filteredCharacters.filter(character => {
        return character.eye_color === filter.eyeColors.toString();
      });
    }

    if (filter.gender) {
      this.filteredCharacters = this.filteredCharacters.filter(character => {
        return character.gender === filter.gender.toString();
      });
    }

    if (filter.birthYear) {
      this.filteredCharacters = this.filteredCharacters.filter(character => {
        return character.birth_year.slice(-3) === filter.birthYear.toString();
      });
    }

    setTimeout(() => {
      // for the pagination update the number of characters
      this.numberOfCharactersFiltered = this.filteredCharacters.length;
    });

  }

  /** Check if all filter's attributes is null */
  private isFilterNull(filter: CharacterFilterOptions) {
    return (filter === null) || (filter.height === null && filter.mass === null
          && filter.hairColors === null && filter.skinColors === null
          && filter.eyeColors === null && filter.birthYear === null
          && filter.gender === null );
  }


  /** Change the limits to show different characters */
  public changePages(page: number) {
    this.endLimit = 8 * page;
    this.startLimit = this.endLimit - 8 > 0 ? this.endLimit - 8 : 0 ;
  }
}
