import { Character } from './../../../shared/model/character.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.component.html',
  styleUrls: ['./card-detail.component.scss']
})
export class CardDetailComponent implements OnInit {

  @Input()
  character: Character;

  constructor() { }

  ngOnInit() {
  }

}
