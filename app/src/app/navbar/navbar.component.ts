import { Component, OnInit, QueryList, ElementRef, ViewChildren, ViewChild } from '@angular/core';

@Component({
  selector: 'cmp-pf-app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @ViewChild ('containerTrigger') elTriggers : QueryList<ElementRef>;

  constructor() { }

  ngOnInit() {
    
  }

}
