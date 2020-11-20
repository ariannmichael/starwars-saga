import { ModalService } from './../../../../core/service/modal.service';
import { Component, OnInit } from '@angular/core';
import { Specie } from './../../../model/specie.model';

/** Modal to show the specie's data */
@Component({
  selector: 'app-specie-modal',
  templateUrl: './specie-modal.component.html',
  styleUrls: ['./specie-modal.component.scss']
})
export class SpecieModalComponent implements OnInit {

  specie: Specie;

  constructor(
    private modalService: ModalService
  ) { }

  ngOnInit() {
  }

  openModal(specie: Specie) {
    this.specie = specie;

    setTimeout(() => {
      this.modalService.open('specie-modal');
    }, 500);
  }

  closeModal() {
    this.modalService.close('specie-modal');
  }
}
