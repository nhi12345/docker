import { Directive, ElementRef, Renderer2 } from '@angular/core';
import { listStyleElementBackground, listStyleElementIcon } from '../data/loading-on-element';
import { StyleElement } from '../models/loading-on-element.model';

@Directive({
  selector: '[appLoadingOnElement]',
  exportAs: 'drLoadingOnElement'
})
export class LoadingOnElementDirective {
  private isLoading: boolean;
  private listStyleElBackground = listStyleElementBackground;
  private listStyleElIcon = listStyleElementIcon;
  private elBackground: HTMLDivElement;

  constructor(
    private eleRef: ElementRef,
    private render: Renderer2
  ) { }


  public showLoadingCenter(sizeIcon: string = '40px', minHeightElement: string = '100px', enableBackGround: boolean = false ): void {

    if (this.isLoading){
      return;
    }

    this.elBackground = this.render.createElement('div');
    this.setStyleMulti(this.elBackground, this.listStyleElBackground);
    if (enableBackGround){
      this.render.setStyle(this.elBackground, 'background-color', '#00000040');
    }

    const elementIcon = this.render.createElement('i');
    this.addClassMulti(elementIcon, ['fa', 'fa-spinner', 'fa-spin', 'fa-fw']);
    this.setStyleMulti(elementIcon, this.listStyleElIcon);
    this.render.setStyle(elementIcon, 'font-size', sizeIcon);
    this.render.setStyle(elementIcon, 'left', 'calc(50% - ' + (parseInt(sizeIcon, 10) / 2) + 'px)');
    this.render.setStyle(elementIcon, 'top', 'calc(50% - ' + (parseInt(sizeIcon, 10) / 2) + 'px)');

    this.render.appendChild(this.elBackground, elementIcon);

    this.render.setStyle(this.eleRef.nativeElement, 'position', 'relative');
    this.render.setStyle(this.eleRef.nativeElement, 'min-height', minHeightElement);
    this.render.appendChild(this.eleRef.nativeElement, this.elBackground);
    this.render.setAttribute(this.eleRef.nativeElement, 'disabled', 'true');

    this.isLoading = true;

  }

  public hideLoadingCenter(): void {
    this.render.removeChild(this.eleRef.nativeElement, this.elBackground);
    this.render.removeStyle(this.eleRef.nativeElement, 'position');
    this.render.removeStyle(this.eleRef.nativeElement, 'min-height');
    this.render.removeAttribute(this.eleRef.nativeElement, 'disabled');
    this.isLoading = false;
  }

  private setStyleMulti(element: any, arrayStyle: StyleElement[]): void {
    arrayStyle.forEach((item: any, index: number) => {
      this.render.setStyle(element, item.key, item.value);
    });
  }

  private addClassMulti(element: any, arrayStyle: Array<string>): void {
    arrayStyle.forEach((item: string, index: number) => {
      this.render.addClass(element, item);
    });
  }

}
