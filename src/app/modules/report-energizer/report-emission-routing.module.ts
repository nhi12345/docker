import { ListReportEmissionFieldPageComponent } from './pages/list-report-emission-field-page/list-report-emission-field-page.component';
import { DetailReportEmissionFieldPageComponent } from './pages/detail-report-emission-field-page/detail-report-emission-field-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/common/guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Báo cáo',
    },
    children: [
      {
        path: 'list-reports',
        component: ListReportEmissionFieldPageComponent,
        data: {
          title: 'Danh sách báo cáo',
        },
        canActivate: [AuthGuard],
      },
      {
        path: 'detail-reports/:fieldId',
        component: DetailReportEmissionFieldPageComponent,
        data: {
          title: 'Chi tiết báo cáo',
        },
        canActivate: [AuthGuard],
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list-reports',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportEmissionRoutingModule {}
