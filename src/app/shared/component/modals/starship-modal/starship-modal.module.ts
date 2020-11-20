import { ModalModule } from './../modal/modal.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarshipModalComponent } from './starship-modal.component';

@NgModule({
  imports: [
    CommonModule,
    ModalModule
  ],
  declarations: [StarshipModalComponent],
  exports: [StarshipModalComponent]
})
export class StarshipModalModule { }
