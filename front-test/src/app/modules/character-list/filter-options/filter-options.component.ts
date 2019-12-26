import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { CharacterFilterOptions } from '../../../shared/model/character-filter-options.model';
import { ModalService } from '../../../core/service/modal.service';
import { Component, OnInit, Output } from '@angular/core';


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

  /** Options for eye, skin colors */
  options = {
    hairColors: [
      'fair', 'gold', 'white', 'blue', 'light', 'red', 'green', 'green-tan',
      'brown', 'pale', 'metal', 'grey', 'mottled green', 'brown mottle', 'dark',
      'orange', 'blue', 'red', 'yellow', 'tan', 'silver'
    ],
    eyeColors: [
      'fair', 'gold', 'white', 'blue', 'light', 'red', 'green', 'green-tan',
      'brown', 'pale', 'metal', 'grey', 'mottled green', 'brown mottle', 'dark',
      'orange', 'blue', 'red', 'yellow', 'tan', 'silver'
    ],
    skinColors: [
      'fair', 'gold', 'white', 'blue', 'light', 'red', 'green', 'green-tan',
      'brown', 'pale', 'metal', 'grey', 'mottled green', 'brown mottle', 'dark',
      'orange', 'blue', 'red', 'yellow', 'tan', 'silver'
    ],
    birthYear: ['BBY', 'ABY'],
    gender: ['male', 'female', 'unknown', 'n/a']
  };


  /** FormGroup to receive the input options */
  filterForm: FormGroup;


  @Output()
  filterOptions: CharacterFilterOptions;

  constructor(
    private modalService: ModalService,
    private fb: FormBuilder
  ) {
    // create the FormGroup instance
    this.filterForm = this.fb.group({
      height: [''],
      mass: [''],
      hairColors: new FormArray([]),
      skinColors: new FormArray([]),
      eyeColors: new FormArray([]),
      birthYear: ['', [Validators.required]],
      gender: ['', [Validators.required]]
    });
  }

  ngOnInit() {
  }

  /**
   * Manage the FormArrays to add select and unselect many options
   * receives the event and the FormArray name to set the configuration
   */
  onCheckChange(event: any, control: any) {
    const formArray: FormArray = this.filterForm.get(control) as FormArray;

    // Add selected element to the arrayForm
    if (event.target.checked) {
      formArray.push(new FormControl(event.target.value));
    } else {
      let i = 0;

      formArray.controls.forEach((ctrl: FormControl) => {
        if (ctrl.value === event.target.value) {
          // Remove the unselected element from the arrayForm
          formArray.removeAt(i);
          return;
        }

        i++;
      });
    }
  }

  submit() {
    console.log(this.filterForm);
  }

  openModal() {
    this.modalService.open('filter-modal');
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
