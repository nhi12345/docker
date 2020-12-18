import { listMenuReport } from './../../data/list-menu';
import { takeUntil } from 'rxjs/operators';
import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseDestroyableDirective } from '../../abstract/base-destroyable';
import { AuthService } from '../../services/auth.service';
import { LayoutService } from '../../services/layout.service';
import { INavData } from '@coreui/angular';
import { IFields } from 'src/app/modules/declare-enterprises/abstract/enterprises.interface';
import { LoadingOnElementDirective } from '../../directive/loading-on-element.directive';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
})
export class DefaultLayoutComponent extends BaseDestroyableDirective implements OnInit {
  @ViewChild('loadingMenu', { static: true }) private elementLoadingMenu: LoadingOnElementDirective;
  public sidebarMinimized = false;
  public listMenu: INavData[] = [];

  constructor(
    private authService: AuthService,
    private layoutService: LayoutService
  ) {
    super();
  }

  public ngOnInit(): void {
    this.getListFields();
  }

  public getListFields() {
    this.elementLoadingMenu.showLoadingCenter();
    this.layoutService
      .getListFields()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (listFields: IFields[]) => {
          this.updateMenu(listFields);
          this.elementLoadingMenu.hideLoadingCenter();
        },
        (err) => {
          this.elementLoadingMenu.hideLoadingCenter();
          console.error(err);
        }
      );
  }

  public toggleMinimize(e: boolean): void {
    this.sidebarMinimized = e;
  }

  public logout() {
    this.authService.logout();
  }

  public onActivate(event: Event) {
    window.scrollTo(0, 0);
  }

  private updateMenu(listFields: IFields[]){
    // this.listMenu.push({
    //   name: 'Dashboard',
    //   url: '/dashboard',
    //   icon: 'icon-speedometer',
    //   badge: {
    //     variant: 'info',
    //     text: 'NEW'
    //   }
    // });

    const titleMenuAdd: INavData = { title: true, name: 'Khai báo' };
    this.listMenu.push(titleMenuAdd);

    if (listFields) {
      listFields.forEach((fields) => {
        const itemMenuAdd: INavData = {
          name: fields.name,
          url: '/enterprises/' + fields.id + '/list-enterprises',
          icon: 'icon-book-open',
        };
        this.listMenu.push(itemMenuAdd);
      });
    }
    this.listMenu = [...this.listMenu];

    if (this.authService.user.type === 'Admin'){
      this.listMenu = [...this.listMenu, ...listMenuReport];
    }
  }
}
