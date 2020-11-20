import { Observable, concat } from 'rxjs';
import { CharacterFilterOptions } from './../../shared/model/character-filter-options.model';
import { Character } from './../../shared/model/character.model';
import { Injectable } from '@angular/core';


/**
 * Service to filter to receive and filter a list of characters
 */
@Injectable({
  providedIn: 'root'
})
export class FilterCharacterService {

  characterList: Character[] = [];

  constructor() { }

  /** Set the list of characters to be filtered */
  setCharacters(characters: Character[]) {
    this.characterList = characters;
  }

  /**
   * Filter the list of characters base on options
   * passing function to function filtering the character list
   */
  filterCharacters(filter: CharacterFilterOptions): Character[] {
    if (!this.isFilterNull(filter)) {
      concat(
        this.filterCharactersHeight$(filter),
        this.filterCharactersMass$(filter),
        this.filterCharactersHairColor$(filter),
        this.filterCharactersSkinColor$(filter),
        this.filterCharactersEyeColor$(filter),
        this.filterCharactersGender$(filter),
        this.filterCharactersBirthYear$(filter)
      ).toPromise()
      .then()
      .catch(error => console.log(error));
    }

    return this.characterList;
  }

  /** Check if all filter's attributes is null */
  private isFilterNull(filter: CharacterFilterOptions) {
    return (filter === null) || (filter.height === null && filter.mass === null
          && filter.hairColors === null && filter.skinColors === null
          && filter.eyeColors === null && filter.birthYear === null
          && filter.gender === null );
  }

  private filterCharactersHeight$(filter: CharacterFilterOptions): Observable<void> {
    return new Observable<void>(subscriber => {
      if (filter.height) {
        this.characterList = this.characterList.filter(character => {
          return character.height === filter.height.toString();
        });
      }

      subscriber.next();
      subscriber.complete();
    });
  }

  private filterCharactersMass$(filter: CharacterFilterOptions): Observable<void> {
    return new Observable<void>(subscriber => {
      if (filter.mass) {
        this.characterList = this.characterList.filter(character => {
          return character.mass === filter.mass.toString();
        });
      }

      subscriber.next();
      subscriber.complete();
    });
  }

  private filterCharactersHairColor$(filter: CharacterFilterOptions): Observable<void> {
    return new Observable<void>(subscriber => {
      if (filter.hairColors) {
        this.characterList = this.characterList.filter(character => {
          return character.hair_color === filter.hairColors.toString();
        });
      }

      subscriber.next();
      subscriber.complete();
    });
  }

  private filterCharactersSkinColor$(filter: CharacterFilterOptions): Observable<void> {
    return new Observable<void>(subscriber => {
      if (filter.skinColors) {
        this.characterList = this.characterList.filter(character => {
          return character.skin_color === filter.skinColors.toString();
        });
      }

      subscriber.next();
      subscriber.complete();
    });
  }

  private filterCharactersEyeColor$(filter: CharacterFilterOptions): Observable<void> {
    return new Observable<void>(subscriber => {
      if (filter.eyeColors) {
        this.characterList = this.characterList.filter(character => {
          return character.eye_color === filter.eyeColors.toString();
        });
      }

      subscriber.next();
      subscriber.complete();
    });
  }

  private filterCharactersGender$(filter: CharacterFilterOptions): Observable<void> {
    return new Observable<void>(subscriber => {
      if (filter.gender) {
        this.characterList = this.characterList.filter(character => {
          return character.gender === filter.gender.toString();
        });
      }

      subscriber.next();
      subscriber.complete();
    });
  }

  private filterCharactersBirthYear$(filter: CharacterFilterOptions): Observable<void> {
    return new Observable<void>(subscriber => {
      if (filter.birthYear) {
        this.characterList = this.characterList.filter(character => {
          return character.birth_year.slice(-3) === filter.birthYear.toString();
        });
      }

      subscriber.next();
      subscriber.complete();
    });
  }

}
