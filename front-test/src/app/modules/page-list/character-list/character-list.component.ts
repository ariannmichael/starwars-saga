import { ActivatedRoute, Router } from '@angular/router';
import { FilterCharacterService } from '../../../core/service/filter-character.service';
import { CharacterFilterOptions } from '../../../shared/model/character-filter-options.model';
import { Component, OnInit, Input, ViewChild, QueryList, AfterViewInit, ViewChildren, ChangeDetectorRef } from '@angular/core';
import { Character } from 'src/app/shared/model/character.model';
import { CharacterService } from 'src/app/core/service/character.service';
import { Observable, concat } from 'rxjs';
import { take, delay } from 'rxjs/operators';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss']
})
export class CharacterListComponent implements OnInit, AfterViewInit {

  /** List of all characters */
  charactersList: Character[] = [];

  /** List of characters returned by the filter */
  filteredCharacters: Character[] = [];

  /** Number of characters for the pagination */
  numberOfCharacters = 0;

  /** Number of characters after filter for the pagination */
  numberOfCharactersFiltered = 0;

  /** Limits to manage the characters to be shown */
  startLimit = 0;
  endLimit = 8;

  /** Current page to be show */
  currentPage = 1;

  /** Flag to show the loading animation */
  isLoading = true;

  /** Reference to the cards loop on the dom */
  @ViewChildren('cardsLoop')
  cardsLoop: QueryList<any>;

  constructor(
    private characterService: CharacterService,
    private filterCharacterService: FilterCharacterService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.configLoadingDataStrategy();
  }

  /** Keep loading animation until page is complete */
  ngAfterViewInit() {
    this.cardsLoop.changes.pipe(delay(0)).subscribe(el => {
      this.isLoading = false;
      this.cdr.detectChanges();
    });

  }

  /**
   * Character List will use the following configuration to load data:
   *  - Load the number of characters for the pagination
   *  - Load all the characters
   *  - Load the current page base on the queryParams
   */
  private configLoadingDataStrategy() {
    concat(
      this.loadAllCharacters$().pipe(take(1)),
      this.loadNumberOfCharacters$(),
      this.loadCurrentPage$()
    ).toPromise()
    .then(res => this.cdr.detectChanges())
    .catch(error => console.log(error));
  }

  /** Load all characters from all pages to the lists */
  private loadAllCharacters$(): Observable<void> {
    return new Observable<void>(subscriber => {
      this.characterService.fetchAllCharactersData().pipe(take(1))
        .subscribe(characters => {
          this.charactersList = characters;
          this.filteredCharacters = characters;

          subscriber.next();
          subscriber.complete();
        },
          error => console.log(error)
        );
    });
  }

  private loadNumberOfCharacters$(): Observable<void> {
    return new Observable<void>(subscriber => {
      this.characterService.getNumberOfCharacters(1)
        .subscribe(res => {
          this.numberOfCharacters = res;
          this.numberOfCharactersFiltered = res;

          subscriber.next();
          subscriber.complete();
        },
        error => console.log(error)
        );
    });
  }

  /**
   * Load and set the current page, base on the query params
   * to keep page persistence
   */
  private loadCurrentPage$() {
    return new Observable<void>(subscriber => {
      this.activatedRoute.queryParams.subscribe(params => {
        this.currentPage = +params['pg'] || 1;
      });

      subscriber.next();
      subscriber.complete();
    });
  }

  /** Search character base on the input on SearchFilter
   *  in case the name be null, show all characters
   */
  public searchCharactersByName(name: string) {
    if (name.length > 0) {
      this.filteredCharacters = [];
      this.loadCharactersByName(name);
    } else {
      this.filteredCharacters = this.charactersList;
      this.numberOfCharactersFiltered = this.numberOfCharacters;
    }

    this.resetPages();
  }

  private loadCharactersByName(name: string) {
    this.isLoading = true;

    this.characterService.findCharactersByName(name)
      .toPromise().then(res => {
        res.results.map(el => this.filteredCharacters.push(el));
        this.numberOfCharactersFiltered = res.count;

        if (res.next) {
          this.loadNextPage(res.next);
        }
      })
      .then(res => this.isLoading = false)
      .catch(error => console.log(error));
  }

  /** Keep loading pages if there is a next page
   *  and getting pages' characters
   */
  private loadNextPage(pageUrl: string) {
    this.characterService.fetchByPage(pageUrl)
      .subscribe(res => {
        res.results.map(el => this.filteredCharacters.push(el));

        if (res.next) {
          this.loadNextPage(res.next);
        } else {
          return;
        }
      },
        error => console.log(error)
      );
  }

  /** Filter the list of characters through service, using filter options */
  filterCharactersByOptions(filter: CharacterFilterOptions) {
    this.resetFilteredCharacters();

    // Add filtered characters to the service to be used
    this.filterCharacterService.setCharacters(this.filteredCharacters);

    setTimeout(() => {
      // filter characters, update the number of characters and pagination
      this.filteredCharacters = this.filterCharacterService.filterCharacters(filter);

      this.numberOfCharactersFiltered = this.filteredCharacters.length;
      this.resetPages();
    });
  }

  private resetFilteredCharacters() {
    this.filteredCharacters = this.charactersList;
    this.numberOfCharactersFiltered = this.filteredCharacters.length;
  }

  /** Reset to the first page */
  private resetPages() {
    this.startLimit = 0;
    this.endLimit = 8;

    this.router.navigate([], {queryParams: { pg: 1 }});
  }

  /** Change the limits to show different characters */
  public changePages(page: number) {
    this.endLimit = 8 * page;
    this.startLimit = this.endLimit - 8 > 0 ? this.endLimit - 8 : 0 ;

    // update the query params base on the new current page
    this.router.navigate([], {queryParams: { pg: page }});
  }
}
