import { ModalService } from '../../../../core/service/modal.service';
import { Component, OnInit, ElementRef, Input, OnDestroy, ContentChild, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, OnDestroy {

  /** Reference to the received template headerTemplate, to be shown in the modal */
  @ContentChild('headerTemplate', {static: false})
  headerTemplate: TemplateRef<any>;

  /** Reference to the received template contentTemplate, to be shown in the modal */
  @ContentChild('contentTemplate', {static: false})
  contentTemplate: TemplateRef<any>;

  /** Id to identify the modal */
  @Input()
  id: string;

  /** Reference to the element on the DOM */
  private modalDetail: any;

  constructor(
    private el: ElementRef,
    private modalService: ModalService
  ) {
    this.modalDetail = el.nativeElement;
  }

  ngOnInit() {
    // ensure id attribute exists
    if (!this.id) {
      console.error('modal must have an id');
      return;
    }

    document.body.appendChild(this.modalDetail);

    this.el.nativeElement.addEventListener('click', (element) => {
      if (element.target.className === 'modal-detail') {
        this.close();
      }
    });

    // add self (this modal instance) to the modal service so it's accessible from controllers
    this.modalService.add(this);
  }

  // remove self from modal service when component is destroyed
  ngOnDestroy(): void {
    this.modalService.remove(this.id);
    this.modalDetail.remove();
  }

  /** Open modal */
  open() {
    this.modalDetail.style.display = 'block';
    document.body.classList.add('modal-open');
  }

  /** Close modal */
  close() {
    this.modalDetail.style.display = 'none';
    document.body.classList.remove('modal-open');
  }

}
