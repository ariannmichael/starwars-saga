import { PaginationModule } from './../../shared/component/pagination/pagination.module';
import { CardListComponent } from './card-list/card-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterListComponent } from './character-list.component';
import { SearchFilterModule } from './../../shared/component/search-filter/search-filter.module';
import { RouterModule } from '@angular/router';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SearchFilterModule,
    PaginationModule
  ],
  declarations: [
    CharacterListComponent,
    CardListComponent
  ]
})
export class CharacterListModule { }
