import { ModalModule } from '../../../shared/component/modals/modal/modal.module';
import { FilterOptionsComponent } from './filter-options/filter-options.component';
import { PaginationModule } from '../../../shared/component/pagination/pagination.module';
import { CardListComponent } from './card-list/card-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterListComponent } from './character-list.component';
import { SearchFilterModule } from '../../../shared/component/search-filter/search-filter.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    SearchFilterModule,
    PaginationModule,
    ModalModule
  ],
  declarations: [
    CharacterListComponent,
    CardListComponent,
    FilterOptionsComponent
  ]
})
export class CharacterListModule { }
