import { Starship } from '../../../../shared/model/starship.model';
import { StarshipService } from '../../../../core/service/starship.service';
import { Vehicle } from '../../../../shared/model/vehicle.model';
import { VehicleService } from '../../../../core/service/vehicle.service';
import { Specie } from '../../../../shared/model/specie.model';
import { SpecieService } from '../../../../core/service/specie.service';
import { PlanetService } from '../../../../core/service/planet.service';
import { Observable, forkJoin } from 'rxjs';
import { Planet } from '../../../../shared/model/planet.model';
import { Film } from '../../../../shared/model/film.model';
import { FilmsService } from '../../../../core/service/film.service';
import { Character } from '../../../../shared/model/character.model';
import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';

/**
 * CardDetailComponent fetch the all character's data
 * and display then on the dom, for more details on the data
 * emits a event to open a modal of descriptions
 */
@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.component.html',
  styleUrls: ['./card-detail.component.scss']
})
export class CardDetailComponent implements OnInit, OnChanges {

  @Input()
  character: Character;

  /**
   * Events to emit objects to CharacterDetailComponent
   * and open the modal with the objects data
   */
  @Output()
  filmEvent = new EventEmitter<Film>();

  @Output()
  planetEvent = new EventEmitter<Planet>();

  @Output()
  specieEvent = new EventEmitter<Specie>();

  @Output()
  starshipEvent = new EventEmitter<Starship>();

  @Output()
  vehicleEvent = new EventEmitter<Vehicle>();

  /** Films that the characters appears */
  films: Film[] = [];

  /** Character's home planet */
  planet: Planet;

  /** Character's species */
  species: Specie[] = [];

  /** Character's starship */
  starships: Starship[] = [];

  /** Character's vehicles */
  vehicles: Vehicle[] = [];

  constructor(
    private filmsService: FilmsService,
    private planetService: PlanetService,
    private specieService: SpecieService,
    private starshipService: StarshipService,
    private vehicleService: VehicleService
  ) { }

  ngOnInit() {
    this.scrollUp();
  }

  private scrollUp() {
    window.scrollTo(0, 0);
  }

  /**
   * When the component receive the character
   * load his data to be shown on the card
   */
  ngOnChanges() {
    if (this.character) {
      forkJoin(
        this.loadCharacterFilms$(),
        this.loadCharacterPlanets$(),
        this.loadCharacterSpecies$(),
        this.loadCharacterStartShips$(),
        this.loadCharacterVehicles$()
      )
      .toPromise()
      .then()
      .catch(error => console.log(error));
    }
  }

  private loadCharacterFilms$(): Observable<void> {
    return new Observable<void>(subscriber => {
      this.character.films.forEach(res => {
        this.filmsService.fetchFilms(res).toPromise()
          .then(film => {
            this.films.push(film);
          })
          .catch(error => console.log(error));
      });

      subscriber.next();
      subscriber.complete();
    });
  }

  private loadCharacterPlanets$(): Observable<void> {
    return new Observable<void>(subscriber => {
      this.planetService.fetchStarship(this.character.homeworld)
        .toPromise().then(res => this.planet = res )
        .catch(error => console.log(error));

      subscriber.next();
      subscriber.complete();
    });
  }

  private loadCharacterSpecies$(): Observable<void> {
    return new Observable<void>(subscriber => {
      this.character.species.forEach(res => {
        this.specieService.fetchSpecie(res).toPromise()
          .then(specie => {
            this.species.push(specie);
        })
        .catch(error => console.log(error));
      });

      subscriber.next();
      subscriber.complete();
    });
  }

  private loadCharacterStartShips$(): Observable<void> {
    return new Observable<void>(subscriber => {
      this.character.starships.forEach(res => {
        this.starshipService.fetchStarship(res).toPromise()
          .then(starship => {
            this.starships.push(starship);
        })
        .catch(error => console.log(error));
      });

      subscriber.next();
      subscriber.complete();
    });
  }

  private loadCharacterVehicles$(): Observable<void> {
    return new Observable<void>(subscriber => {
      this.character.vehicles.forEach(res => {
        this.vehicleService.fetchVehicle(res).toPromise()
          .then(vehicle => {
            this.vehicles.push(vehicle);
        })
        .catch(error => console.log(error));
      });

      subscriber.next();
      subscriber.complete();
    });
  }

  get isHeightUnknown() {
    return this.character.height === 'unknown';
  }

  get isMassUnknown() {
    return this.character.mass === 'unknown';
  }

  /**
   * Emit event to open the film modal
   * passing the film object to be shown
   */
  openFilmModal(film: Film) {
    this.filmEvent.emit(film);
  }

  /**
   * Emit event to open the planet modal
   * passing the planet object to be shown
   */
  openPlanetModal() {
    this.planetEvent.emit(this.planet);
  }

  /**
   * Emit event to open the specie modal
   * passing the specie object to be shown
   */
  openSpecieModal(specie: Specie) {
    this.specieEvent.emit(specie);
  }

  /**
   * Emit event to open the starship modal
   * passing the starship object to be shown
   */
  openStarshipModal(starship: Starship) {
    this.starshipEvent.emit(starship);
  }

  /**
   * Emit event to open the vehicle modal
   * passing the vehicle object to be shown
   */
  openVehicleModal(vehicle: Vehicle) {
    this.vehicleEvent.emit(vehicle);
  }
}
