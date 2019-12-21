import { CharacterService } from 'src/app/core/service/character.service';
import { Character } from 'src/app/shared/model/character.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.scss']
})
export class CharacterDetailComponent implements OnInit {

  characterId: string;

  character: Character;

  constructor(
    private route: ActivatedRoute,
    private characterService: CharacterService
  ) { }

  ngOnInit() {
    this.characterId = this.route.snapshot.paramMap.get('id');
    this.loadCharacter();
  }

  loadCharacter() {
    this.characterService.findCharactersById(this.characterId)
      .subscribe(res => this.character = res);
  }

}
