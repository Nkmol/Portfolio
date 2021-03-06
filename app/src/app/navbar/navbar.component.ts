import { Component, OnInit, QueryList, ElementRef, ViewChildren, ViewChild, Renderer2, AfterViewInit } from '@angular/core';
import { WindowRef } from "app/shared/scripting/window-ref.service";
import { Renderer2Custom } from "app/shared/scripting/custom-renderer.service";

@Component({
  selector: 'cmp-pf-app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, AfterViewInit {
  @ViewChild ('hoverAction') elHoverAction : ElementRef;
  @ViewChild ('clickAction') elClickAction : ElementRef;
  @ViewChild ('collapse') elCollapse : ElementRef;

  private elLastClickedNavLink : HTMLElement;
  private mediaQueryList : MediaQueryList;
  public isCollapsed : Boolean = true;

  constructor(private renderer : Renderer2, private windowRef : WindowRef) { }

  ngOnInit() {
    this.mediaQueryList = this.windowRef.matchMedia("(max-width: 991px)");
  }

  // After "ViewChild" has been inited
  ngAfterViewInit() {
    this.mediaQueryList.addListener(this.resetOrientationElements.bind(this));
  }

  moveHoverElement(el : HTMLElement) {
    this.elLastClickedNavLink = el;
    let nativeActionEl = this.elHoverAction.nativeElement;

    if(this.mediaQueryList.matches) {
      this.renderer.setStyle(nativeActionEl, 'top', el.offsetTop.toString() + 'px');
      this.renderer.setStyle(nativeActionEl, 'height', el.clientHeight.toString() + 'px');
    }
    else {
      this.renderer.setStyle(nativeActionEl, 'left', el.offsetLeft.toString() + 'px');
      this.renderer.setStyle(nativeActionEl, 'width', el.clientWidth.toString() + 'px');
    }
  }

  moveClickElement(el : HTMLElement) {
    this.elLastClickedNavLink = el;
    let nativeActionEl = this.elClickAction.nativeElement;

    if(this.mediaQueryList.matches) {
      let top = el.offsetTop + el.offsetHeight / 2;

      this.renderer.setStyle(nativeActionEl, 'top', top.toString() + 'px');
    }
    else {
      let left = el.offsetLeft + el.offsetWidth / 2;

      this.renderer.setStyle(nativeActionEl, 'left', left.toString() + 'px');
    }
  }

  resetOrientationElements() {
    this.renderer.removeAttribute(this.elHoverAction.nativeElement, "style");
    this.renderer.removeAttribute(this.elClickAction.nativeElement, "style");

    this.moveClickElement(this.elLastClickedNavLink);
  }
}
