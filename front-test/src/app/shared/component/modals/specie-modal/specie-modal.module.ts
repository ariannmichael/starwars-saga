import { ModalModule } from './../modal/modal.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpecieModalComponent } from './specie-modal.component';

@NgModule({
  imports: [
    CommonModule,
    ModalModule
  ],
  declarations: [SpecieModalComponent],
  exports: [SpecieModalComponent]
})
export class SpecieModalModule { }
