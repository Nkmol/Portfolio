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

  public unlistenArray = [];

  constructor(private renderer : Renderer2, private customRenderer : Renderer2Custom, private window : WindowRef) { }

  ngOnInit() {
    this.mediaQueryList = window.matchMedia("(max-width: 991px)");
  }

  // After "ViewChild" has been inited
  ngAfterViewInit() {
    // Extend custom Renderer2 with an listen(element, events[]) interface
    // Extend custom Renderer2 with an unlisten(element, [events[]]) interface. Removes all when no events specified
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

  ngbToggleCollapseAnimation() {
    let transitionEvents = "webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend".split(' ');
    this.unlistenArray = this.customRenderer.on(this.elCollapse.nativeElement, transitionEvents, this.complete.bind(this))

    if(this.isCollapsed) {
      this.show();
    } 
    else {
      this.hide();
    }
  }

  show() {
    if(!this.isCollapsed)
      return;

    let nativeEl = this.elCollapse.nativeElement;

    this.renderer.removeClass(nativeEl, "collapse");
    this.renderer.addClass(nativeEl, "collapsing");

    this.renderer.setStyle(nativeEl, "height", `${nativeEl["scrollHeight"]}px`);
    console.log("collapsing");
  }

  complete(event) {
    console.log("show = " + this.isCollapsed);
    let nativeEl = this.elCollapse.nativeElement;

    if(this.isCollapsed) {
      this.renderer.removeClass(nativeEl, "collapsing");
      this.renderer.addClass(nativeEl, "show");
      this.renderer.addClass(nativeEl, "collapse");

      this.isCollapsed = false;
    }
    else {
      this.renderer.removeClass(nativeEl, "collapsing");
      this.renderer.addClass(nativeEl, "collapse");

      this.isCollapsed = true;
    }

    this.unlistenArray.forEach(event => event());
  }

  hide() {
    if(this.isCollapsed)
      return;

    let nativeEl = this.elCollapse.nativeElement;
    
    this.renderer.addClass(nativeEl, "collapsing");
    this.renderer.removeClass(nativeEl, "show");
    this.renderer.removeClass(nativeEl, "collapse");

    this.renderer.setStyle(nativeEl, "height", '')
  }
}
