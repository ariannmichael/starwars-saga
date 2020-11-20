import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanetModalComponent } from './planet-modal.component';
import { ModalModule } from '../modal/modal.module';

@NgModule({
  imports: [
    CommonModule,
    ModalModule
  ],
  declarations: [PlanetModalComponent],
  exports: [PlanetModalComponent]
})
export class PlanetModalModule { }
