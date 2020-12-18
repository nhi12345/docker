import { Component, OnInit } from '@angular/core';
import { listIndictorReports } from 'src/app/common/data/indicator-report-data';
import { IndicatorReport } from '../../models/report-energizer.model';

@Component({
  selector: 'app-form-detail-indicator-report',
  templateUrl: './form-detail-indicator-report.component.html',
  styleUrls: ['./form-detail-indicator-report.component.scss'],
})
export class FormDetailIndicatorReportComponent implements OnInit {
  public listYears = [2019, 2018, 2017];
  public reports: IndicatorReport[] = listIndictorReports;
  public selectedReport = this.reports.find((report) => report.year === 2019);
  constructor() {}

  ngOnInit(): void {}

  public onSelectYear(year: number): void {
    this.selectedReport = this.reports.find((report) => report.year === year);
  }
}
