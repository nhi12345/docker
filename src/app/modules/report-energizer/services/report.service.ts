import { ReportComsumption, ReportEmissionByField } from './../models/report-energizer.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ReportEmission } from '../models/report-energizer.model';
import { IFields } from '../../declare-enterprises/abstract/enterprises.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  private baseUrl = environment.baseURlFake;
  // private baseUrl = environment.baseURl;

  constructor(public router: Router, private httpClient: HttpClient) {}

  public getAllEmissionReport(): Observable<ReportEmission[]> {
    return this.httpClient.get<ReportEmission[]>(`${this.baseUrl}/reports/emissions/enterprises`);
  }

  public getEmissionReportByEnterpriseId(enterpriseId: number): Observable<ReportEmission> {
    return this.httpClient.get<ReportEmission>(
      `${this.baseUrl}/reports/emissions/enterprises/${enterpriseId}`
    );
  }

  public getFieldReportByFieldId(fieldId: number, year: string): Observable<ReportComsumption> {
    const params = new HttpParams().append('year', year);
    return this.httpClient.get<ReportComsumption>(
      `${this.baseUrl}/reports/consumptions/fields/${fieldId}`, { params }
    );
  }

  public getEmissionReportByFieldId(fieldId: number, year: string): Observable<ReportEmissionByField> {
    const params = new HttpParams().append('year', year);
    return this.httpClient.get<ReportEmissionByField>(
      `${this.baseUrl}/reports/emissions/fields/${fieldId}`, { params }
    );
  }

  public getListYears(): Observable<string[]> {
    return this.httpClient.get<string[]>(`${this.baseUrl}/reports/years`);
  }

  public getListFields(): Observable<IFields[]> {
    return this.httpClient.get(this.baseUrl + 'fields').pipe(
      map((result: IFields[]) => {
        result.sort((a, b) => a.id - b.id);
        return result;
      })
    );
  }
}
