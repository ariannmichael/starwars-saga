import { ModalModule } from './../../shared/component/modal/modal.module';
import { CardDetailComponent } from './card-detail/card-detail.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterDetailComponent } from './character-detail.component';

@NgModule({
  imports: [
    CommonModule,
    ModalModule
  ],
  declarations: [
    CharacterDetailComponent,
    CardDetailComponent
  ]
})
export class CharacterDetailModule { }
