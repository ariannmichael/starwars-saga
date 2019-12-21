import { CardCharacterComponent } from './card-character/card-character.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterListComponent } from './character-list.component';
import { SearchFilterModule } from './../../shared/component/search-filter/search-filter.module';


@NgModule({
  imports: [
    CommonModule,
    SearchFilterModule
  ],
  declarations: [
    CharacterListComponent,
    CardCharacterComponent
  ]
})
export class CharacterListModule { }
