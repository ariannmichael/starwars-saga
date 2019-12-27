import { ModalModule } from '../../shared/component/modals/modal/modal.module';
import { CardDetailComponent } from './card-detail/card-detail.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilmModalModule } from './../../shared/component/modals/film-modal/film-modal.module';
import { CharacterDetailComponent } from './character-detail.component';

@NgModule({
  imports: [
    CommonModule,
    ModalModule,
    FilmModalModule
  ],
  declarations: [
    CharacterDetailComponent,
    CardDetailComponent
  ]
})
export class CharacterDetailModule { }
