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

  /** Films that the characters shows up */
  films: Film[] = [];

  planet: Planet;

  constructor(
    private filmsService: FilmsService,
    private planetService: PlanetService
  ) { }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.character) {
      forkJoin(
        this.loadCharacterFilms$(),
        this.loadCharacterPlanets$()
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

}
