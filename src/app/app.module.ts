import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DefaultLayoutComponent } from './common/layout/default-layout/default-layout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { httpInterceptorProviders } from './common/interceptors';
import { NotFoundComponent } from './common/pages/not-found/not-found.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from '@coreui/angular';
import { LayoutService } from './common/services/layout.service';
import { LoadingModule } from './common/module/loading/loading.module';
import { ReportEnergizerModule } from './modules/report-energizer/report-energizer.module';
import localeIt from '@angular/common/locales/it';
import { registerLocaleData } from '@angular/common/';
registerLocaleData(localeIt);

@NgModule({
  declarations: [
    AppComponent,
    DefaultLayoutComponent,
    NotFoundComponent,
  ],
  imports: [
    ReportEnergizerModule,
    RouterModule,
    BrowserModule,
    LoadingModule,
    AppAsideModule,
    AppHeaderModule,
    AppFooterModule,
    AppSidebarModule,
    AppRoutingModule,
    HttpClientModule,
    AppBreadcrumbModule,
    PerfectScrollbarModule,
    BrowserAnimationsModule,
    TabsModule.forRoot(),
    ToastrModule.forRoot(),
    BsDropdownModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot(),
  ],
  providers: [
    LayoutService,
    httpInterceptorProviders,
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
