import { Directive, ElementRef, HostListener } from '@angular/core';
import { NgControl, NgModel } from '@angular/forms';

@Directive({
    selector: '[appInputOnlyNumberForm]'
})
export class OnlyInputNumberFormDirective {

    constructor(private el: ElementRef, private control?: NgControl) { }

    @HostListener('input', ['$event']) onInputChange(event) {
        const value = this.el.nativeElement.value;
        const valueFormatted = value.replace(/[^0-9]*/g, '');
        this.control.control.patchValue(Number(valueFormatted) || '');
        if (value !== this.el.nativeElement.value) {
            event.stopPropagation();
        }
    }

    @HostListener('document:click', ['$event.target'])
    public onClick(targetElement): void {
      const isInsideInput: boolean = this.el.nativeElement.contains(targetElement);
      if (isInsideInput) {}
      else{
        const value = this.el.nativeElement.value;
        if (!value || value.trim() === ''){
            this.control.control.patchValue(0);
        }
      }
    }
}


@Directive({
    selector: '[appInputOnlyNumberModel]'
})
export class OnlyInputNumberModelDirective {

    constructor(private el: ElementRef, private model: NgModel) { }

    @HostListener('input', ['$event']) onInputChange(event) {
        const value = this.el.nativeElement.value;
        const valueFormatted = value.replace(/[^0-9]*/g, '');
        this.model.control.patchValue(Number(valueFormatted));
        if (value !== this.el.nativeElement.value) {
            event.stopPropagation();
        }
    }

    @HostListener('document:click', ['$event.target'])
    public onClick(targetElement): void {
      const isInsideInput: boolean = this.el.nativeElement.contains(targetElement);
      if (isInsideInput) {}
      else{
        const value = this.el.nativeElement.value;
        if (!value || value.trim() === ''){
            this.model.control.patchValue(0);
        }
      }
    }
}
