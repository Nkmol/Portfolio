import { Component, OnInit, QueryList, ElementRef, ViewChildren, ViewChild, Renderer2 } from '@angular/core';

@Component({
  selector: 'cmp-pf-app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @ViewChild ('action') elAction : ElementRef;

  constructor(private renderer : Renderer2) { }

  ngOnInit() {
  }

  moveHoverElement(el : HTMLElement) {
    let elRef = new ElementRef(el);

    let nativeActionEl = this.elAction.nativeElement;
    this.renderer.setStyle(nativeActionEl, 'left', el.offsetLeft.toString() + 'px');
    this.renderer.setStyle(nativeActionEl, 'width', el.clientWidth.toString() + 'px');
  }

}
