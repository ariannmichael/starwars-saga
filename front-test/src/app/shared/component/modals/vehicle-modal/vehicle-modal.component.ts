import { Vehicle } from './../../../model/vehicle.model';
import { Component, OnInit, Input } from '@angular/core';
import { ModalService } from 'src/app/core/service/modal.service';

@Component({
  selector: 'app-vehicle-modal',
  templateUrl: './vehicle-modal.component.html',
  styleUrls: ['./vehicle-modal.component.scss']
})
export class VehicleModalComponent implements OnInit {

  @Input()
  vehicle: Vehicle;

  constructor(
    private modalService: ModalService
  ) { }

  ngOnInit() {
  }

  openModal() {
    setTimeout(() => {
      this.modalService.open('vehicle-modal');
    }, 500);
  }

  closeModal() {
    this.modalService.close('vehicle-modal');
  }
}
