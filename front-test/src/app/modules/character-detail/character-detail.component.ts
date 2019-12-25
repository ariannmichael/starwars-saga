import { ModalService } from './../../core/service/modal.service';
import { ModalComponent } from './../../shared/component/modal/modal.component';
import { CharacterService } from 'src/app/core/service/character.service';
import { Character } from 'src/app/shared/model/character.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.scss']
})
export class CharacterDetailComponent implements OnInit {

  @ViewChild('modal', {static: false})
  customModal: ModalComponent;

  characterId: string;

  character: Character;

  constructor(
    private route: ActivatedRoute,
    private characterService: CharacterService,
    private modalService: ModalService
  ) { }

  ngOnInit() {
    this.characterId = this.route.snapshot.paramMap.get('id');
    this.loadCharacter();
  }

  loadCharacter() {
    this.characterService.findCharactersById(this.characterId)
      .subscribe(res => this.character = res);
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

}
