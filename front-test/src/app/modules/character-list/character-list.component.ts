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
    this.loadAllCharacters();
  }

  /** Load all characters to list */
  loadAllCharacters() {
    this.characterService.fetchAllCharacters()
      .then(characters => {
        this.charactersList = characters;
        console.log(characters);
      });
  }

  /** Search character base on the input */
  searchCharacters(name: string) {
    this.characterService.findCharactersByName(name)
      .subscribe(res => {
        this.peoplePage = res;
        this.charactersList = res.results;
      });
  }

}
