import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Pagination } from '../../model/pagination.model';


/**
 * PaginationComponent is a component for receive the number of elements and pages
 * then mount the pagination and informs when the page changes
 */
@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  /** Array to manage the number of pages to show */
  pagesArray: Array<number> = [];

  currentPage = 1;

  @Input()
  set setPagination(pagination: Pagination) {
    if (pagination) {
      const pagesAmount = Math.ceil(pagination.itemsCount / pagination.pageSize);
      this.pagesArray = new Array(pagesAmount).fill(1);
    }
  }

  @Output()
  goToPage = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  /** Inform that the page changed */
  public setPage(pageNumber: number): void {
    if (pageNumber !== this.currentPage) {
      this.currentPage = pageNumber;
      this.goToPage.emit(pageNumber);
    }
  }

}
