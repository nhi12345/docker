import { Component, OnInit } from '@angular/core';
import { Fields } from '../../models/enterprises.model';
import { EnterprisesService } from '../../services/enterprises.service';
import { takeUntil } from 'rxjs/operators';
import { BaseDestroyableDirective } from 'src/app/common/abstract/base-destroyable';
import { IFields } from '../../abstract/enterprises.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MESSAGE } from 'src/app/common/data/message';

@Component({
  selector: 'app-declare-enterprises-pages',
  templateUrl: './declare-enterprises-pages.component.html',
  styleUrls: ['./declare-enterprises-pages.component.scss']
})
export class DeclareEnterprisesPagesComponent extends BaseDestroyableDirective implements OnInit {
  public fieldsCurrent: Fields;
  public enterprisesId: number;

  constructor(
    private router: Router,
    private enterprisesService: EnterprisesService,
    private activatedRoute: ActivatedRoute,
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
          this.fieldsCurrent.name = result.name.toLocaleLowerCase();
        },
        () => {
          this.toastr.error(MESSAGE.ERROR, MESSAGE.NOTIFICATION);
        }
      );
  }

  public cancel(): void {
    this.router.navigate(['/enterprises/' + this.fieldsCurrent.id + '/list-enterprises']);
  }

  public submit(status: string): void{
    if (status === 'ADD_SUCCESS' || status === 'EDIT_SUCCESS'){
      this.toastr.success(MESSAGE[status], MESSAGE.NOTIFICATION);
      this.router.navigate(['/enterprises/' + this.fieldsCurrent.id + '/list-enterprises']);
    }
    else{
      this.toastr.error(MESSAGE.ERROR, MESSAGE.NOTIFICATION);
    }
  }
}
