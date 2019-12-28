import { ModalService } from './../../../../core/service/modal.service';
import { Component, OnInit, Input } from '@angular/core';
import { Planet } from 'src/app/shared/model/planet.model';

@Component({
  selector: 'app-planet-modal',
  templateUrl: './planet-modal.component.html',
  styleUrls: ['./planet-modal.component.scss']
})
export class PlanetModalComponent implements OnInit {

  @Input()
  planet: Planet;

  constructor(
    private modalService: ModalService
  ) { }

  ngOnInit() {
  }

  openModal() {
    setTimeout(() => {
      this.modalService.open('planet-modal');
    }, 500);
  }

  closeModal() {
    this.modalService.close('planet-modal');
  }
}
