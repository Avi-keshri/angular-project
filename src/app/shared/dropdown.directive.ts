import { Directive, HostBinding, HostListener, Input, Output, EventEmitter, Renderer2, ElementRef, OnChanges } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective implements OnChanges {
  @Input() open: boolean;
  @Output() clickOutside = new EventEmitter<MouseEvent>();

  constructor(private _renderer: Renderer2, private _elem: ElementRef) { }

  ngOnChanges() {
    const elem = this._elem.nativeElement.querySelector(".dropdown-menu");
    if (this.open) {
      this._renderer.addClass(elem, "show");
    } else {
      this._renderer.removeClass(elem, "show");
    }
  }

  @HostListener("document:click", ["$event", "$event.target"])
  public onClick(event: MouseEvent, targetElement: HTMLElement): void {
    if (!targetElement) {
      return;
    }
    const clickInside = this._elem.nativeElement.contains(targetElement);
    if (!clickInside && open) {
      this.clickOutside.emit(event);
    }
  }

}
