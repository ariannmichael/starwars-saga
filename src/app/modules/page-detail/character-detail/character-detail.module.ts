import { StarshipModalModule } from '../../../shared/component/modals/starship-modal/starship-modal.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilmModalModule } from '../../../shared/component/modals/film-modal/film-modal.module';
import { CharacterDetailComponent } from './character-detail.component';
import { SpecieModalModule } from 'src/app/shared/component/modals/specie-modal/specie-modal.module';
import { VehicleModalModule } from '../../../shared/component/modals/vehicle-modal/vehicle-modal.module';
import { PlanetModalModule } from '../../../shared/component/modals/planet-modal/planet-modal.module';
import { ModalModule } from '../../../shared/component/modals/modal/modal.module';
import { CardDetailComponent } from './card-detail/card-detail.component';

@NgModule({
  imports: [
    CommonModule,
    ModalModule,
    FilmModalModule,
    PlanetModalModule,
    SpecieModalModule,
    StarshipModalModule,
    VehicleModalModule
  ],
  declarations: [
    CharacterDetailComponent,
    CardDetailComponent
  ]
})
export class CharacterDetailModule { }
