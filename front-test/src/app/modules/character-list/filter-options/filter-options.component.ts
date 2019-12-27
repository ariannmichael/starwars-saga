import { Observable } from 'rxjs';
import { Character } from './../../../shared/model/character.model';
import { CharacterService } from './../../../core/service/character.service';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { CharacterFilterOptions } from '../../../shared/model/character-filter-options.model';
import { ModalService } from '../../../core/service/modal.service';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';


/**
 * FilterOptionsComponent show the options to filter the characters
 * and emit the options selected
 */
@Component({
  selector: 'app-filter-options',
  templateUrl: './filter-options.component.html',
  styleUrls: ['./filter-options.component.scss']
})
export class FilterOptionsComponent implements OnInit {

  /** FormGroup to receive the input options */
  filterForm: FormGroup;

  /** Store the filter options */
  private options = new CharacterFilterOptions();

  @Output()
  filterOptionsEvent = new EventEmitter<CharacterFilterOptions>();

  constructor(
    private modalService: ModalService,
    private characterService: CharacterService,
    private fb: FormBuilder
  ) {
    // create the FormGroup instance
    this.filterForm = this.fb.group({
      height: [null],
      mass: [null],
      hairColors: [null, [Validators.required]],
      skinColors: [null, [Validators.required]],
      eyeColors: [null, [Validators.required]],
      birthYear: [null, [Validators.required]],
      gender: [null, [Validators.required]]
    });
  }

  ngOnInit() {
    this.loadFilterOptions().toPromise().then();
  }

  loadFilterOptions() {
    return new Observable<void>(subscriber => {
      this.characterService.findCharactersOptions()
      .then(res => {
        this.options = res;
        this.options.birthYear = ['BBY', 'ABY'];
        this.options.gender = ['male', 'female', 'unknown', 'n/a'];

      });
    });
  }

  /** Fill entity to be emitted */
  private fillEntity(): CharacterFilterOptions {
    const filterOptions = new CharacterFilterOptions();

    filterOptions.height = this.filterForm.value.height;
    filterOptions.mass = this.filterForm.value.mass;
    filterOptions.hairColors = this.filterForm.value.hairColors;
    filterOptions.skinColors = this.filterForm.value.skinColors;
    filterOptions.eyeColors = this.filterForm.value.eyeColors;
    filterOptions.birthYear = this.filterForm.value.birthYear;
    filterOptions.gender = this.filterForm.value.gender;

    return filterOptions;
  }

  /** emit the filter options */
  submit() {
    const filter = this.fillEntity();
    this.filterOptionsEvent.emit(filter);

    this.closeModal();
  }

  openModal() {
    setTimeout(() => {
      this.modalService.open('filter-modal');
    }, 500);
  }

  closeModal() {
    this.modalService.close('filter-modal');
  }

  get hairColors() {
    return this.options.hairColors;
  }

  get skinColors() {
    return this.options.skinColors;
  }

  get eyeColors() {
    return this.options.eyeColors;
  }

  get yearsOptions() {
    return this.options.birthYear;
  }

  get genderOptions() {
    return this.options.gender;
  }
}
