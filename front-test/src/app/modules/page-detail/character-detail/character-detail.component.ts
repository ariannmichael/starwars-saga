import { Vehicle } from '../../../shared/model/vehicle.model';
import { Starship } from '../../../shared/model/starship.model';
import { PlanetModalComponent } from '../../../shared/component/modals/planet-modal/planet-modal.component';
import { Specie } from '../../../shared/model/specie.model';
import { FilmModalComponent } from '../../../shared/component/modals/film-modal/film-modal.component';
import { Film } from '../../../shared/model/film.model';
import { CharacterService } from 'src/app/core/service/character.service';
import { Character } from 'src/app/shared/model/character.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpecieModalComponent } from 'src/app/shared/component/modals/specie-modal/specie-modal.component';
import { Planet } from 'src/app/shared/model/planet.model';
import { StarshipModalComponent } from 'src/app/shared/component/modals/starship-modal/starship-modal.component';
import { VehicleModalComponent } from 'src/app/shared/component/modals/vehicle-modal/vehicle-modal.component';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.scss']
})
export class CharacterDetailComponent implements OnInit {

  characterId: string;

  character: Character;

  /** One modal to show any film */
  @ViewChild('filmModal', {static: false})
  filmModal: FilmModalComponent;

  @ViewChild('planetModal', {static: false})
  planetModal: PlanetModalComponent;

  /** One modal to show any specie */
  @ViewChild('specieModal', {static: false})
  specieModal: SpecieModalComponent;

  /** One modal to show any starship */
  @ViewChild('starshipModal', {static: false})
  startshipModal: StarshipModalComponent;

  @ViewChild('vehicleModal', {static: false})
  vehicleModal: VehicleModalComponent;

  /** Flag to show the loading animation */
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private characterService: CharacterService
  ) { }

  ngOnInit() {
    this.characterId = this.route.snapshot.paramMap.get('id');
    this.loadCharacter();
  }

  loadCharacter() {
    this.characterService.findCharactersById(this.characterId)
      .subscribe(res => {
        this.character = res;
        this.isLoading = false;
      },
        error => console.log(error)
      );
  }

  /** Pass Film to be show on the modal */
  openFilmModal(film: Film) {
    this.filmModal.openModal(film);
  }

  /** Pass Planet to be show on the modal */
  openPlanetModal(planet: Planet) {
    this.planetModal.openModal(planet);
  }

  /** Pass Specie to be show on the modal */
  openSpecieModal(specie: Specie) {
    this.specieModal.openModal(specie);
  }

  /** Pass Starship to be show on the modal */
  openStarshipModal(starship: Starship) {
    this.startshipModal.openModal(starship);
  }

  /** Pass Vehicle to be show on the modal */
  openVehicleModal(vehicle: Vehicle) {
    this.vehicleModal.openModal(vehicle);
  }
}
