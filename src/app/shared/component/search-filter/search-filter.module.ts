import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchFilterComponent } from './search-filter.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [SearchFilterComponent],
  exports: [SearchFilterComponent]
})
export class SearchFilterModule { }
