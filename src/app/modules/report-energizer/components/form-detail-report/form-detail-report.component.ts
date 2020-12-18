import { ReportEmission } from './../../models/report-energizer.model';
import { BaseDestroyableDirective } from 'src/app/common/abstract/base-destroyable';
import { takeUntil } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { ReportService } from './../../services/report.service';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { LoadingOnElementDirective } from 'src/app/common/directive/loading-on-element.directive';
import { MESSAGE } from 'src/app/common/data/message';

@Component({
  selector: 'app-form-detail-report',
  templateUrl: './form-detail-report.component.html',
  styleUrls: ['./form-detail-report.component.scss'],
})
export class FormDetailReportComponent extends BaseDestroyableDirective implements OnInit {
  @ViewChild('formDetail', { static: true })
  private elementFormDetail: LoadingOnElementDirective;
  @Input() public reportId: number;
  @Output() public cancelEmitter = new EventEmitter<void>();

  public detailEmissionReport: ReportEmission;
  constructor(private reportService: ReportService, private toastr: ToastrService) {
    super();
  }

  ngOnInit(): void {
    this.getEmissionReportByEnterpriseId();
  }

  public getEmissionReportByEnterpriseId() {
    this.elementFormDetail.showLoadingCenter();
    this.reportService
      .getEmissionReportByEnterpriseId(this.reportId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (res) => {
          this.detailEmissionReport = this.joinAllBranchName(res);
          this.elementFormDetail.hideLoadingCenter();
        },
        () => {
          this.toastr.error(MESSAGE.ERROR, MESSAGE.NOTIFICATION);
          this.elementFormDetail.hideLoadingCenter();
        }
      );
  }
  public cancel(): void {
    this.cancelEmitter.emit();
  }

  private joinAllBranchName(report: ReportEmission): ReportEmission{
    const listBranchName = report.branches.map(branch => {
      return branch.name;
    });
    report.branchNameAll = listBranchName.join(' - ');
    return report;
  }
}
