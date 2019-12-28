import { Starship } from './../../../model/starship.model';
import { ModalService } from 'src/app/core/service/modal.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-starship-modal',
  templateUrl: './starship-modal.component.html',
  styleUrls: ['./starship-modal.component.scss']
})
export class StarshipModalComponent implements OnInit {

  @Input()
  starship: Starship;

  constructor(
    private modalService: ModalService
  ) { }

  ngOnInit() {
  }

  openModal() {
    setTimeout(() => {
      this.modalService.open('starship-modal');
    }, 500);
  }

  closeModal() {
    this.modalService.close('starship-modal');
  }
}
