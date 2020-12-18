import { takeUntil } from 'rxjs/operators';
import { ReportService } from './../../services/report.service';
import { ReportEmission } from './../../models/report-energizer.model';
import { BaseDestroyableDirective } from 'src/app/common/abstract/base-destroyable';
import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LoadingOnElementDirective } from 'src/app/common/directive/loading-on-element.directive';
import { MESSAGE } from 'src/app/common/data/message';
import { LocationService } from 'src/app/common/services/location.service';

@Component({
  selector: 'app-list-report-energizer',
  templateUrl: './list-report-energizer.component.html',
  styleUrls: ['./list-report-energizer.component.scss'],
})
export class ListReportEnergizerComponent
  extends BaseDestroyableDirective
  implements OnInit {
  @ViewChild('table', { static: true })
  private elementTable: LoadingOnElementDirective;
  @Output() public toEditPageEmitter = new EventEmitter<number>();

  public fieldsIdValue: number;
  public listReportEnergizer: ReportEmission[];

  constructor(
    private reportService: ReportService,
    private toastr: ToastrService,
    public locationService: LocationService
  ) {
    super();
  }

  public ngOnInit(): void {
    this.getEmissionReports();
  }

  public redirectToEditPage(reportId: number): void {
    this.toEditPageEmitter.emit(reportId);
  }

  public trackByFn(index: number, item: any): number {
    return item.id;
  }

  public getEmissionReports() {
    this.elementTable.showLoadingCenter();
    this.reportService
      .getAllEmissionReport()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (res) => {
          this.listReportEnergizer = res;
          this.elementTable.hideLoadingCenter();
        },
        () => {
          this.toastr.error(MESSAGE.ERROR, MESSAGE.NOTIFICATION);
          this.elementTable.hideLoadingCenter();
        }
      );
  }
}
