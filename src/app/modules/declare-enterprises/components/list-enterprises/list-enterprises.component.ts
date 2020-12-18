import { IEnterprises } from '../../abstract/enterprises.interface';
import {
  Component,
  OnInit,
  ViewChild,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { BaseDestroyableDirective } from 'src/app/common/abstract/base-destroyable';
import { EnterprisesService } from '../../services/enterprises.service';
import { takeUntil } from 'rxjs/operators';
import { LoadingOnElementDirective } from 'src/app/common/directive/loading-on-element.directive';
import { MESSAGE } from 'src/app/common/data/message';
import { ToastrService } from 'ngx-toastr';
import { LocationService } from 'src/app/common/services/location.service';

@Component({
  selector: 'app-list-enterprises',
  templateUrl: './list-enterprises.component.html',
  styleUrls: ['./list-enterprises.component.scss'],
})
export class ListEnterprisesComponent
  extends BaseDestroyableDirective
  implements OnInit {
  @ViewChild('table', { static: true })
  private elementTable: LoadingOnElementDirective;

  @Input() public set fieldsId(value: number) {
    this.listEnterprises = [];
    this.fieldsIdValue = value;
    this.getListMiningIndustry();
  }

  @Output() public toDetailPageEmitter = new EventEmitter<number>();
  @Output() public toEditPageEmitter = new EventEmitter<number>();

  public fieldsIdValue: number;
  public listEnterprises: IEnterprises[];

  constructor(
    private enterprisesService: EnterprisesService,
    private toastr: ToastrService,
    public locationService: LocationService
  ) {
    super();
  }

  public ngOnInit(): void {}

  public getListMiningIndustry() {
    this.elementTable.showLoadingCenter();
    this.enterprisesService
      .getListEnterprisesByFieldId(this.fieldsIdValue)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (result: IEnterprises[]) => {
          this.elementTable.hideLoadingCenter();
          this.listEnterprises = this.joinAllBranchName(result);
        },
        () => {
          this.toastr.error(MESSAGE.ERROR, MESSAGE.NOTIFICATION);
          this.elementTable.hideLoadingCenter();
        }
      );
  }

  public redirectToDetailPage(enterprisesId: number): void {
    this.toDetailPageEmitter.emit(enterprisesId);
  }

  public redirectToEditPage(enterprisesId: number): void {
    this.toEditPageEmitter.emit(enterprisesId);
  }

  public trackByFn(index: number, item: any): number {
    return item.id;
  }

  private joinAllBranchName(listEnterprises: IEnterprises[]): IEnterprises[] {
    const listEnterprisesFormatted: IEnterprises[] = [];
    listEnterprises.forEach((enterprise) => {
      const listBranchName = enterprise.branches.map((branch) => {
        return branch.name;
      });
      enterprise.branchNameAll = listBranchName.join(' - ');
      listEnterprisesFormatted.push(enterprise);
    });
    return listEnterprises;
  }
}
