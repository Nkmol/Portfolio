import { Directive, Input, HostBinding, Renderer2, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { NgbCollapse } from "@ng-bootstrap/ng-bootstrap";
import { Renderer2Custom } from "app/shared/scripting/custom-renderer.service";
import { TransitionEvents } from "app/shared/scripting/config";

@Directive({
  selector: '[pfAnimatedNgbCollapse]'
})
export class AnimatedCollapseDirective implements OnInit, OnDestroy {

  // Native bootstrap classes
  private readonly _classShow = "show";
  private readonly _classCollapsed = "collapse";
  private readonly _classTransition = "collapsing";

  private unlistenArray: (() => void)[] = [];
  private completeEvent: ((element) => void) = () => { return };
  private customRenderer: Renderer2Custom;

  // tslint:disable-next-line:no-input-rename
  private _collapsed: boolean = null;
  @Input('pfAnimatedNgbCollapse') set collapsed(value: boolean) {
    if (value !== this._collapsed) {

      let oldVal = this._collapsed;
      this._collapsed = value;
      if(oldVal !== null) this.toggle();
    }
  }
  @HostBinding('class.collapse') collapse: boolean = this._collapsed;
  @HostBinding('class.show') shown: boolean = !this._collapsed;

  constructor(private renderer: Renderer2, private elCollapse: ElementRef) {
    this.customRenderer = new Renderer2Custom(this.renderer);
    this.unlistenArray = this.customRenderer.on(this.elCollapse.nativeElement, TransitionEvents, this.complete.bind(this))
  }

  ngOnInit() {
    
  }

  ngOnDestroy() {
    this.unlistenArray.forEach(event => event());
  }

  toggle() {
    if (!this._collapsed) {
      this.show();
    }
    else {
      this.hide();
    }
  }

  show() {
    let nativeEl = this.elCollapse.nativeElement;

    this.renderer.removeClass(nativeEl, this._classCollapsed);

    // Activate transition listener
    this.completeEvent = this.onCompleteShow;
    this.renderer.addClass(nativeEl, this._classTransition);

    this.renderer.setStyle(nativeEl, "height", `${nativeEl["scrollHeight"]}px`);
  }

  hide() {
    let nativeEl = this.elCollapse.nativeElement;

    // Activate transition listener
    this.completeEvent = this.onCompleteHide;
    this.renderer.addClass(nativeEl, this._classTransition);

    this.renderer.removeClass(nativeEl, this._classShow);
    this.renderer.removeClass(nativeEl, this._classCollapsed);

    this.renderer.setStyle(nativeEl, "height", '')
  }

  complete() {
    let nativeEl = this.elCollapse.nativeElement;

    this.completeEvent(nativeEl);
  }

  onCompleteHide(nativeCollapseEl: any) {
    this.renderer.removeClass(nativeCollapseEl, this._classTransition);
    this.renderer.addClass(nativeCollapseEl, this._classCollapsed);

    this._collapsed = true;
  }

  onCompleteShow(nativeCollapseEl: any) {
    this.renderer.removeClass(nativeCollapseEl, this._classTransition);
    this.renderer.addClass(nativeCollapseEl, this._classShow);
    this.renderer.addClass(nativeCollapseEl, this._classCollapsed);

    this._collapsed = false;
  }
}