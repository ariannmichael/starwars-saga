import { CardDetailComponent } from './card-detail/card-detail.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterDetailComponent } from './character-detail.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CharacterDetailComponent,
    CardDetailComponent
  ]
})
export class CharacterDetailModule { }
