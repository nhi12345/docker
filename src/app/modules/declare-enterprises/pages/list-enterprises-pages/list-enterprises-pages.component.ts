import { IFields } from '../../abstract/enterprises.interface';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseDestroyableDirective } from 'src/app/common/abstract/base-destroyable';
import { EnterprisesService } from '../../services/enterprises.service';
import { takeUntil } from 'rxjs/operators';
import { Fields } from '../../models/enterprises.model';
import { ToastrService } from 'ngx-toastr';
import { MESSAGE } from 'src/app/common/data/message';

@Component({
  selector: 'app-list-enterprises-pages',
  templateUrl: './list-enterprises-pages.component.html',
  styleUrls: ['./list-enterprises-pages.component.scss'],
})
export class ListEnterprisesPagesComponent extends BaseDestroyableDirective implements OnInit {
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
    this.activatedRoute.params.subscribe(params => {
      this.fieldsCurrent.id = Number(params.fieldsId);
      this.getFieldsCurrent();
    });
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

  public redirectToAdd() {
    this.router.navigate(['/enterprises/' + this.fieldsCurrent.id + '/add-enterprises']);
  }

  public redirectToDetailPage(enterprisesId: number): void {
    this.router.navigate(['/enterprises/' + this.fieldsCurrent.id + '/detail-enterprises/' + enterprisesId]);
  }

  public redirectToEditPage(enterprisesId: number): void {
    this.router.navigate(['/enterprises/' + this.fieldsCurrent.id + '/edit-enterprises/' + enterprisesId]);
  }
}
