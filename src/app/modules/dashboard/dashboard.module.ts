import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { RouterModule } from '@angular/router';
import { DashBoardComponent } from './pages/dash-board/dash-board.component';
import { FormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-bootstrap/carousel';

@NgModule({
  declarations: [
    DashBoardComponent
  ],
  imports: [
    FormsModule,
    RouterModule,
    CommonModule,
    DashboardRoutingModule,
    CarouselModule.forRoot(),
  ]
})
export class DashboardModule { }
