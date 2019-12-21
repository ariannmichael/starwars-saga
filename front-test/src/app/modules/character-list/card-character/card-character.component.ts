import { Character } from 'src/app/shared/model/character.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-character',
  templateUrl: './card-character.component.html',
  styleUrls: ['./card-character.component.scss']
})
export class CardCharacterComponent implements OnInit {

  @Input()
  character: Character;

  constructor() { }

  ngOnInit() {
  }

  /** Get character id from his url */
  get characterId(): string {
    return this.character.url.split('/').slice(-2)[0];
  }
}
