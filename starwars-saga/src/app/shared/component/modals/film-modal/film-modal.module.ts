import { ModalModule } from './../modal/modal.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilmModalComponent } from './film-modal.component';

@NgModule({
  imports: [
    CommonModule,
    ModalModule
  ],
  declarations: [FilmModalComponent],
  exports: [FilmModalComponent]
})
export class FilmModalModule { }
