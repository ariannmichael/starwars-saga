import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/core/service/modal.service';
import { Vehicle } from './../../../model/vehicle.model';

/** Modal to show the vehicle's data */
@Component({
  selector: 'app-vehicle-modal',
  templateUrl: './vehicle-modal.component.html',
  styleUrls: ['./vehicle-modal.component.scss']
})
export class VehicleModalComponent implements OnInit {

  vehicle: Vehicle;

  constructor(
    private modalService: ModalService
  ) { }

  ngOnInit() {
  }

  openModal(vehicle: Vehicle) {
    this.vehicle = vehicle;

    setTimeout(() => {
      this.modalService.open('vehicle-modal');
    }, 500);
  }

  closeModal() {
    this.modalService.close('vehicle-modal');
  }
}
