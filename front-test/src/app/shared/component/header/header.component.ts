import { Component, OnInit } from '@angular/core';

/**
 * HeaderComponent is a component to mount the header
 * and be reused if needed
 */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
