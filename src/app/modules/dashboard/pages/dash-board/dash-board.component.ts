import { Component, OnInit } from '@angular/core';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { BaseDestroyableDirective } from 'src/app/common/abstract/base-destroyable';


@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
})
export class DashBoardComponent extends BaseDestroyableDirective implements OnInit {
  public myInterval = 4000;
  public activeSlideIndex = 1;
  ngOnInit(): void {}
}
