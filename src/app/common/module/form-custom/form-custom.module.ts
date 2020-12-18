import { NgModule } from '@angular/core';
import {
  OnlyInputNumberModelDirective,
  OnlyInputNumberFormDirective,
} from '../../directive/input-only-number.directive';

@NgModule({
  exports: [OnlyInputNumberModelDirective, OnlyInputNumberFormDirective],
  declarations: [OnlyInputNumberModelDirective, OnlyInputNumberFormDirective],
})
export class FormCustomModule {}
