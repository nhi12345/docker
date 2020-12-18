import { BaseDestroyableDirective } from 'src/app/common/abstract/base-destroyable';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-report-emission-field-page',
  templateUrl: './list-report-emission-field-page.component.html',
  styleUrls: ['./list-report-emission-field-page.component.scss'],
})
export class ListReportEmissionFieldPageComponent
  extends BaseDestroyableDirective
  implements OnInit {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService
  ) {
    super();
  }

  public ngOnInit(): void {}

  public redirectToEditPage(reportId: number): void {
    this.router.navigate(['/reports/emission-by-fields/detail-reports', reportId]);
  }
}
