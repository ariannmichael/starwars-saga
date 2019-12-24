import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

/**
 * SearchFilterComponent is component that has a input field
 * and inform the input
 */
@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.scss']
})
export class SearchFilterComponent implements OnInit {

  @Output()
  searchEvent = new EventEmitter<string>();

  /** Element input on the dom */
  @ViewChild('searchField', {static: false})
  searchFilter: ElementRef;

  /** Value to be searched */
  searchInput: string;

  constructor() { }

  ngOnInit() {
  }

  /** Emit the value to be searched */
  searchValue() {
    this.searchEvent.emit(this.searchInput);
  }

}
