import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterListComponent } from './character-list.component';
import { SearchFilterComponent } from 'src/app/shared/component/search-filter/search-filter.component';

@NgModule({
  imports: [
    CommonModule,
    SearchFilterComponent
  ],
  declarations: [CharacterListComponent]
})
export class CharacterListModule { }
