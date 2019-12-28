import { Specie } from './../../../model/specie.model';
import { ModalService } from './../../../../core/service/modal.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-specie-modal',
  templateUrl: './specie-modal.component.html',
  styleUrls: ['./specie-modal.component.scss']
})
export class SpecieModalComponent implements OnInit {

  @Input()
  specie: Specie;

  constructor(
    private modalService: ModalService
  ) { }

  ngOnInit() {
  }

  openModal() {
    setTimeout(() => {
      this.modalService.open('specie-modal');
    }, 500);
  }

  closeModal() {
    this.modalService.close('specie-modal');
  }
}
