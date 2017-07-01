import { Component, OnInit, QueryList, ElementRef, ViewChildren, ViewChild, Renderer2 } from '@angular/core';

@Component({
  selector: 'cmp-pf-app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @ViewChild ('hoverAction') elHoverAction : ElementRef;
  @ViewChild ('clickAction') elClickAction : ElementRef;

  constructor(private renderer : Renderer2) { }

  ngOnInit() {
  }

  moveHoverElement(el : HTMLElement) {
    let nativeActionEl = this.elHoverAction.nativeElement;

    this.renderer.setStyle(nativeActionEl, 'left', el.offsetLeft.toString() + 'px');
    this.renderer.setStyle(nativeActionEl, 'width', el.clientWidth.toString() + 'px');
  }

  moveClickElement(el : HTMLElement) {
    let nativeActionEl = this.elClickAction.nativeElement;
    let left = el.offsetLeft + el.offsetWidth / 2;

    this.renderer.setStyle(nativeActionEl, 'left', left.toString() + 'px');
  }
}
