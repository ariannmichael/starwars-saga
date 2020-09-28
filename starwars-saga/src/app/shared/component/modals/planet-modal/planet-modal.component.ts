import { ModalService } from './../../../../core/service/modal.service';
import { Component, OnInit } from '@angular/core';
import { Planet } from 'src/app/shared/model/planet.model';

/** Modal to show the planet's data */
@Component({
  selector: 'app-planet-modal',
  templateUrl: './planet-modal.component.html',
  styleUrls: ['./planet-modal.component.scss']
})
export class PlanetModalComponent implements OnInit {

  planet: Planet;

  constructor(
    private modalService: ModalService
  ) { }

  ngOnInit() {
  }

  openModal(planet: Planet) {
    this.planet = planet;

    setTimeout(() => {
      this.modalService.open('planet-modal');
    }, 500);
  }

  closeModal() {
    this.modalService.close('planet-modal');
  }
}
