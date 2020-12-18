import { BaseDestroyableDirective } from 'src/app/common/abstract/base-destroyable';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-report-page',
  templateUrl: './list-report-page.component.html',
  styleUrls: ['./list-report-page.component.scss'],
})
export class ListReportPageComponent extends BaseDestroyableDirective implements OnInit {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService
  ) {
    super();
  }

  public ngOnInit(): void {}

  public redirectToEditPage(reportId: number): void {
    this.router.navigate(['/reports/detail-reports', reportId]);
  }
}
