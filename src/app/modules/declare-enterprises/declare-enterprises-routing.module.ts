import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/common/guard/auth.guard';
import { DeclareEnterprisesPagesComponent } from './pages/declare-enterprises-pages/declare-enterprises-pages.component';
import { DetailEnterprisesPagesComponent } from './pages/detail-enterprises-pages/detail-enterprises-pages.component';
import { ListEnterprisesPagesComponent } from './pages/list-enterprises-pages/list-enterprises-pages.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Khai báo doanh nghiệp',
    },
    children: [
      {
        path: 'list-enterprises',
        component: ListEnterprisesPagesComponent,
        data: {
          title: 'Danh sách danh nghiệp'
        },
        canActivate: [AuthGuard]
      },
      {
        path: 'add-enterprises',
        component: DeclareEnterprisesPagesComponent,
        data: {
          title: 'Thêm danh nghiệp'
        },
        canActivate: [AuthGuard]
      },
      {
        path: 'edit-enterprises/:enterprisesId',
        component: DeclareEnterprisesPagesComponent,
        data: {
          title: 'Chỉnh sửa chi tiết doanh nghiệp'
        },
        canActivate: [AuthGuard]
      },
      {
        path: 'detail-enterprises/:enterprisesId',
        component: DetailEnterprisesPagesComponent,
        data: {
          title: 'Chi tiết doanh nghiệp'
        },
        canActivate: [AuthGuard]
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list-enterprises',
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeclareMiningIndustryRoutingModule { }
