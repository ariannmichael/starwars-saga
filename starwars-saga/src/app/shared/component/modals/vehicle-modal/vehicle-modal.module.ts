import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleModalComponent } from './vehicle-modal.component';
import { ModalModule } from '../modal/modal.module';

@NgModule({
  imports: [
    CommonModule,
    ModalModule
  ],
  declarations: [VehicleModalComponent],
  exports: [VehicleModalComponent]
})
export class VehicleModalModule { }
