import { Component, OnInit } from '@angular/core';
import { PeoplePageSummary } from 'src/app/shared/model/people-page-summary';
import { Character } from 'src/app/shared/model/character.model';
import { CharacterService } from 'src/app/core/service/character.service';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss']
})
export class CharacterListComponent implements OnInit {

  private peoplePage: PeoplePageSummary;
  private charactersList: Character[];

  constructor(private characterService: CharacterService) { }

  ngOnInit() {
    this.loadFirstCharacters();
  }

  loadFirstCharacters() {
    this.characterService.fetchCharacters()
      .subscribe(res => {
        this.peoplePage = res;
        this.charactersList = res.results;
      });
  }

  /** Load the characters for the next page */
  loadNextCharacters() {
    if (this.peoplePage.next) {
      this.characterService.fetchOthersCharacters(this.peoplePage.next)
        .subscribe(res => {
          this.peoplePage = res;
          this.charactersList = res.results;
        });
    }
  }

  /** Load the characters for the previous page */
  loadPreviousCharacters() {
    if (this.peoplePage.previous) {
      this.characterService.fetchOthersCharacters(this.peoplePage.previous)
        .subscribe(res => {
          this.peoplePage = res;
          this.charactersList = res.results;
        });
    }
  }

  searchCharacters(name: string) {
    this.characterService.findCharacters(name)
      .subscribe(res => {
        this.peoplePage = res;
        this.charactersList = res.results;
      });
  }

}
