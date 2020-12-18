import { ReportEmissionByField } from './../../models/report-energizer.model';
import { BaseDestroyableDirective } from 'src/app/common/abstract/base-destroyable';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { LoadingOnElementDirective } from 'src/app/common/directive/loading-on-element.directive';
import { ReportService } from '../../services/report.service';
import { MESSAGE } from 'src/app/common/data/message';
import { takeUntil } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-form-detail-emission-field-report',
  templateUrl: './form-detail-emission-field-report.component.html',
  styleUrls: ['./form-detail-emission-field-report.component.scss'],
})
export class FormDetailEmissionFieldReportComponent
  extends BaseDestroyableDirective
  implements OnInit {
  @ViewChild('formDetail', { static: true })
  private elementFormDetail: LoadingOnElementDirective;
  @Input() public fieldId: number;
  @Output() public cancelEmitter = new EventEmitter<void>();

  public listYears: string[];
  public emissionFieldReport: ReportEmissionByField;
  constructor(private reportService: ReportService, private toastr: ToastrService) {
    super();
  }

  ngOnInit(): void {
    this.loadData();
  }

  public getEmissionReportByFieldId(year: string) {
    if (year !== this.emissionFieldReport.year.toString()) {
      this.elementFormDetail.showLoadingCenter();
      this.reportService
        .getEmissionReportByFieldId(this.fieldId, year)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          (res) => {
            this.emissionFieldReport = res;
            this.elementFormDetail.hideLoadingCenter();
          },
          () => {
            this.toastr.error(MESSAGE.ERROR, MESSAGE.NOTIFICATION);
            this.elementFormDetail.hideLoadingCenter();
          }
        );
    }
  }

  public loadData(): void {
    this.elementFormDetail.showLoadingCenter();
    forkJoin([
      this.reportService.getEmissionReportByFieldId(this.fieldId, ''),
      this.reportService.getListYears()
    ])
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (result) => {
          this.emissionFieldReport = result[0];
          this.listYears = result[1];
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
}
