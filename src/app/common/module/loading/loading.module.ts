import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingOnElementDirective } from '../../directive/loading-on-element.directive';



@NgModule({
  exports: [LoadingOnElementDirective],
  declarations: [LoadingOnElementDirective],
  imports: [
    CommonModule
  ]
})
export class LoadingModule { }
