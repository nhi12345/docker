import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/common/guard/auth.guard';
import { DetailReportFieldPageComponent } from './pages/detail-report-field-page/detail-report-field-page.component';
import { ListReportFieldPageComponent } from './pages/list-report-field-page/list-report-field-page.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Báo cáo',
    },
    children: [
      {
        path: 'list-reports',
        component: ListReportFieldPageComponent,
        data: {
          title: 'Danh sách báo cáo',
        },
        canActivate: [AuthGuard],
      },
      {
        path: 'detail-reports/:fieldId',
        component: DetailReportFieldPageComponent,
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
export class ReportFieldRoutingModule {}
