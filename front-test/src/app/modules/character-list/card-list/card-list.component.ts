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
}
