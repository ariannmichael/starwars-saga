import { Starship } from './../../../shared/model/starship.model';
import { StarshipService } from './../../../core/service/starship.service';
import { Vehicle } from './../../../shared/model/vehicle.model';
import { VehicleService } from './../../../core/service/vehicle.service';
import { Specie } from './../../../shared/model/specie.model';
import { SpecieService } from './../../../core/service/specie.service';
import { PlanetService } from './../../../core/service/planet.service';
import { Observable, forkJoin } from 'rxjs';
import { Planet } from './../../../shared/model/planet.model';
import { Film } from './../../../shared/model/film.model';
import { FilmsService } from './../../../core/service/film.service';
import { Character } from './../../../shared/model/character.model';
import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.component.html',
  styleUrls: ['./card-detail.component.scss']
})
export class CardDetailComponent implements OnInit, OnChanges {

  @Input()
  character: Character;

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
      .toPromise().then();
    }
  }

  private loadCharacterFilms$(): Observable<void> {
    return new Observable<void>(subscriber => {
      this.character.films.forEach(res => {
        this.filmsService.fetchFilms(res).toPromise()
          .then(film => {
            this.films.push(film);
        });
      });

      subscriber.next();
      subscriber.complete();
    });
  }

  private loadCharacterPlanets$(): Observable<void> {
    return new Observable<void>(subscriber => {
      this.planetService.fetchStarship(this.character.homeworld)
        .toPromise().then(res => this.planet = res );

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
        });
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
        });
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
        });
      });

      subscriber.next();
      subscriber.complete();
    });
  }

}
