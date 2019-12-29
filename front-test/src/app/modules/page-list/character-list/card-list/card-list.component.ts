import { Character } from 'src/app/shared/model/character.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent implements OnInit {

  @Input()
  character: Character;

  constructor() { }

  ngOnInit() {
  }

  /** Get character id from his url */
  get characterId(): string {
    return this.character.url.split('/').slice(-2)[0];
  }

  /** Get if height is unknown, will not show the measure  */
  get isHeightUnknown(): boolean {
    return this.character.height === 'unknown';
  }

  /** Get if mass is unknown, will not show the measure  */
  get isMassUnknown(): boolean {
    return this.character.mass === 'unknown';
  }
}
