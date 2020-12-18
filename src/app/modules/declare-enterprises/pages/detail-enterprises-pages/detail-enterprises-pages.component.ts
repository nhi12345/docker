import { IFields } from '../../abstract/enterprises.interface';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EnterprisesService } from '../../services/enterprises.service';
import { BaseDestroyableDirective } from 'src/app/common/abstract/base-destroyable';
import { takeUntil } from 'rxjs/operators';
import { Fields } from '../../models/enterprises.model';
import { ToastrService } from 'ngx-toastr';
import { MESSAGE } from 'src/app/common/data/message';

@Component({
  selector: 'app-detail-enterprises-pages',
  templateUrl: './detail-enterprises-pages.component.html',
  styleUrls: ['./detail-enterprises-pages.component.scss'],
})
export class DetailEnterprisesPagesComponent extends BaseDestroyableDirective implements OnInit {
  public enterprisesId: number;
  public fieldsCurrent: Fields;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private enterprisesService: EnterprisesService,
    private toastr: ToastrService
  ) {
    super();
    this.fieldsCurrent = new Fields();
  }
  public ngOnInit(): void {
    this.fieldsCurrent.id = Number(this.activatedRoute.snapshot.paramMap.get('fieldsId'));
    this.enterprisesId = Number(this.activatedRoute.snapshot.paramMap.get('enterprisesId'));
    this.getFieldsCurrent();
  }

  public getFieldsCurrent(){
    this.enterprisesService.getFieldsByFieldsId(this.fieldsCurrent.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (result: IFields) => {
          this.fieldsCurrent.name = result.name?.toLocaleLowerCase();
        },
        () => {
          this.toastr.error(MESSAGE.ERROR, MESSAGE.NOTIFICATION);
        }
      );
  }

  public cancel(): void {
    this.router.navigate(['/enterprises/' + this.fieldsCurrent.id + '/list-enterprises']);
  }
}
