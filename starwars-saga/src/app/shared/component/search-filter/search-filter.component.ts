import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

/**
 * SearchFilterComponent is component that has a input field
 * and inform the input
 */
@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.scss']
})
export class SearchFilterComponent implements OnInit, OnDestroy {

  /** Subject to push values any time, leaving the need to press enter */
  private searchSubject$: Subject<string> = new Subject();

  @Output()
  searchEvent = new EventEmitter<string>();

  /** Value to be searched */
  searchInput: string;

  constructor() {
    this.setSearchSubscription();
  }

  ngOnInit() {
  }

  /** Set the subject to emit a value */
  private setSearchSubscription() {
    this.searchSubject$.pipe(
      debounceTime(500)
    ).subscribe((value: string) => {
      this.searchEvent.emit(value);
    });
  }

  /** Emit the value to be searched */
  updateSearch(value: string) {
    this.searchSubject$.next(value);
  }

  ngOnDestroy() {
    this.searchSubject$.unsubscribe();
  }

}
