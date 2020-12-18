import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashBoardComponent } from './pages/dash-board/dash-board.component';
import { AuthGuard } from 'src/app/common/guard/auth.guard';
const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Home',
    },
    children: [
      {
        path: '',
        component: DashBoardComponent,
        data: {
          title: 'Dashboard'
        },
        canActivate: [AuthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
