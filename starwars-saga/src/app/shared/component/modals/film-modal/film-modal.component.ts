import { ModalService } from './../../../../core/service/modal.service';
import { Component, OnInit } from '@angular/core';
import { Film } from './../../../model/film.model';

/** Modal to show the films' data */
@Component({
  selector: 'app-film-modal',
  templateUrl: './film-modal.component.html',
  styleUrls: ['./film-modal.component.scss']
})
export class FilmModalComponent implements OnInit {

  film: Film;

  constructor(
    private modalService: ModalService
  ) { }

  ngOnInit() {
  }

  openModal(film: Film) {
    this.film = film;

    setTimeout(() => {
      this.modalService.open('film-modal');
    }, 500);
  }

  closeModal() {
    this.modalService.close('film-modal');
  }

}
