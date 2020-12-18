import {
  Component,
  OnInit,
  Input,
  ViewChild,
  Output,
  EventEmitter,
} from '@angular/core';
import { EnterprisesService } from '../../services/enterprises.service';
import { LoadingOnElementDirective } from 'src/app/common/directive/loading-on-element.directive';
import { takeUntil } from 'rxjs/operators';
import { BaseDestroyableDirective } from 'src/app/common/abstract/base-destroyable';
import {
  IEnterprisesToServer,
  IBranches,
  IEnergy,
} from '../../abstract/enterprises.interface';
import { forkJoin } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MESSAGE } from 'src/app/common/data/message';
import { DecimalPipe } from '@angular/common';
import { LocationService } from 'src/app/common/services/location.service';

@Component({
  selector: 'app-form-detail-enterprises',
  templateUrl: './form-detail-enterprises.component.html',
  styleUrls: ['./form-detail-enterprises.component.scss'],
})
export class FormDetailEnterprisesComponent
  extends BaseDestroyableDirective
  implements OnInit {
  @ViewChild('formDetail', { static: true })
  private elementFormDetail: LoadingOnElementDirective;

  @Input() public enterprisesId: number;
  @Input() public fieldsId: number;

  @Output() public cancelEmitter = new EventEmitter<void>();

  public settingDropdown = {
    singleSelection: false,
    idField: 'id',
    textField: 'name',
    enableCheckAll: false,
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: false,
  };
  public formDetailEnterprises: FormGroup;
  public enterprises: IEnterprisesToServer;
  public listBranches: IBranches[];
  public branchesSelected: IBranches[];
  public listEnergyConsumption: IEnergy[];

  constructor(
    private enterprisesService: EnterprisesService,
    private toastr: ToastrService,
    private decimalPipe: DecimalPipe,
    private locationService: LocationService
  ) {
    super();
  }

  public ngOnInit(): void {
    this.loadData();
    this.createForm();
  }

  public createForm(): void {
    this.formDetailEnterprises = new FormGroup({
      baseInfo: new FormGroup({
        name: new FormControl(
          { value: '', disabled: true },
          Validators.required
        ),
        foundedYear: new FormControl(
          { value: '2020', disabled: true },
          Validators.required
        ),
        taxCode: new FormControl(
          { value: '', disabled: true },
          Validators.required
        ),
        phoneNumber: new FormControl(
          { value: '', disabled: true },
          Validators.required
        ),
        address: new FormGroup({
          province: new FormControl(
            { value: '', disabled: true },
            Validators.required
          ),
          district: new FormControl(
            { value: '', disabled: true },
            Validators.required
          ),
          town: new FormControl(
            { value: '', disabled: true },
            Validators.required
          ),
          xCoordinate: new FormControl(
            { value: '', disabled: true },
            Validators.required
          ),
          yCoordinate: new FormControl(
            { value: '', disabled: true },
            Validators.required
          ),
          productionValue: new FormControl(
            { value: '', disabled: true },
            Validators.required
          ),
          employees: new FormControl(
            { value: '', disabled: true },
            Validators.required
          ),
          branchesId: new FormControl({ value: null, disabled: true }),
        }),
      }),
    });
  }

  public loadData() {
    this.elementFormDetail.showLoadingCenter();
    forkJoin([
      this.enterprisesService.getEnterprisesById(this.enterprisesId),
      this.enterprisesService.getListBranchesByFieldsId(this.fieldsId),
      this.enterprisesService.getListEnergyConsumption(),
    ])
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (result) => {
          this.enterprises = result[0];
          this.fetchBaseData();

          const listBranches: IBranches[] = result[1];
          this.listBranches = listBranches;

          const listEnergyConsumption: IEnergy[] = result[2];
          this.listEnergyConsumption = listEnergyConsumption;
          this.addFieldsEnergyConsumptionForForm(listEnergyConsumption);

          this.branchesSelected = this.enterprises.branches as IBranches[];
          this.addFieldsProductionForForm(this.branchesSelected);
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

  private fetchBaseData(): void {
    const province = this.locationService.getProvince(
      this.enterprises.province
    );
    const district = this.locationService.getDistrict(
      this.enterprises.district
    );
    const town = this.locationService.getCommune(this.enterprises.town);
    this.formDetailEnterprises.patchValue({
      baseInfo: {
        name: this.enterprises.name,
        foundedYear: this.enterprises.foundedYear,
        taxCode: this.enterprises.taxCode,
        phoneNumber: this.enterprises.phoneNumber,
        address: {
          province: province ? province.name : this.enterprises.province,
          district: district ? district.name : this.enterprises.district,
          town: town ? town.name : this.enterprises.town,
          xCoordinate: this.enterprises.xcoordinate,
          yCoordinate: this.enterprises.ycoordinate,
          productionValue: this.decimalPipe.transform(
            this.enterprises.productionValue,
            '1.0-2',
            'it'
          ),
          employees: this.decimalPipe.transform(
            this.enterprises.employees,
            '1.0-0',
            'it'
          ),
          branchesId: this.enterprises.branches,
        },
      },
    });
  }

  private addFieldsProductionForForm(listBranches: IBranches[]): void {
    if (listBranches) {
      listBranches.forEach((branch) => {
        const productionGroup: FormGroup = new FormGroup({});
        branch.listProduct = [];

        this.enterprises.productions.forEach((production) => {
          if (production.branchId === branch.id) {
            branch.listProduct.push({
              branchId: branch.id,
              id: production.productionId,
              name: production.production,
              unit: production.unit,
            });

            const productControl = new FormControl(
              {
                value: this.decimalPipe.transform(
                  production.volume,
                  '1.2-2',
                  'it'
                ),
                disabled: true,
              },
              Validators.required
            );

            productionGroup.addControl(
              production.productionId.toString(),
              productControl
            );
          }
        });
        this.formDetailEnterprises.addControl(
          'production' + branch.id,
          productionGroup
        );
      });
    }
  }

  private addFieldsEnergyConsumptionForForm(
    listEnergyConsumption: IEnergy[]
  ): void {
    if (listEnergyConsumption) {
      const energyConsumptionGroup: FormGroup = new FormGroup({});
      listEnergyConsumption.forEach((energyConsumption) => {
        const energyConsumptionItem = this.enterprises.energies.find(
          (energyConsumptionData) => {
            return energyConsumptionData.energyId === energyConsumption.id;
          }
        );

        let energyConsumptionControl: FormControl;
        if (energyConsumptionItem) {
          energyConsumptionControl = new FormControl(
            {
              value: this.decimalPipe.transform(
                energyConsumptionItem.volume,
                '1.2-2',
                'it'
              ),
              disabled: true,
            },
            Validators.required
          );
        } else {
          energyConsumptionControl = new FormControl(
            { value: 0, disabled: true },
            Validators.required
          );
        }

        energyConsumptionGroup.addControl(
          energyConsumption.id.toString(),
          energyConsumptionControl
        );
      });

      this.formDetailEnterprises.addControl(
        'energyConsumption',
        energyConsumptionGroup
      );
    }
  }
}
