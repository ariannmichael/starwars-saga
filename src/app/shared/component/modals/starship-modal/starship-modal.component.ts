import { ModalService } from 'src/app/core/service/modal.service';
import { Component, OnInit } from '@angular/core';
import { Starship } from './../../../model/starship.model';

/** Modal to show the starship's data */
@Component({
  selector: 'app-starship-modal',
  templateUrl: './starship-modal.component.html',
  styleUrls: ['./starship-modal.component.scss']
})
export class StarshipModalComponent implements OnInit {

  starship: Starship;

  constructor(
    private modalService: ModalService
  ) { }

  ngOnInit() {
  }

  openModal(starship: Starship) {
    this.starship = starship;

    setTimeout(() => {
      this.modalService.open('starship-modal');
    }, 500);
  }

  closeModal() {
    this.modalService.close('starship-modal');
  }
}
