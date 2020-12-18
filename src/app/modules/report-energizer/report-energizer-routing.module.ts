import { DetailReportPageComponent } from './pages/detail-report-page/detail-report-page.component';
import { ListReportPageComponent } from './pages/list-report-page/list-report-page.component';
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
        component: ListReportPageComponent,
        data: {
          title: 'Danh sách báo cáo',
        },
        canActivate: [AuthGuard],
      },
      {
        path: 'detail-reports/:reportId',
        component: DetailReportPageComponent,
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
export class ReportEnergizerRoutingModule {}
