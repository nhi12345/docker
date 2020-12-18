import { IEnterprises, IResultAddEnterprises, IProductionData, IFields, IEnergy, IProduction } from '../abstract/enterprises.interface';
import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IBranches, IEnergyData, IEnterprisesToServer } from '../abstract/enterprises.interface';
import { EnterprisesToServer, ResultAddEnterprises, Fields } from '../models/enterprises.model';

@Injectable({ providedIn: 'root' })
export class EnterprisesService {

  private baseUrl = environment.baseURlFake;
  // private baseUrl = environment.baseURl;

  constructor(
    public router: Router,
    private httpClient: HttpClient,
    ) {
  }


  public getFieldsByFieldsId(fieldId: number): Observable<IFields> {
    return this.httpClient.get(this.baseUrl + 'fields/' + fieldId).pipe(
      map((result: IFields) => {
        return result || new Fields();
      })
    );
  }

  public getListEnterprisesByFieldId(fieldId: number): Observable<IEnterprises[]> {
    return this.httpClient.get(this.baseUrl + 'fields/' + fieldId + '/get-list-enterprises-by-field-id/').pipe(
      map((result: IEnterprises[]) => {
        return result || [];
      })
    );
  }

  public addEnterprises(enterprises: IEnterprisesToServer): Observable<IResultAddEnterprises> {
    return this.httpClient.post(this.baseUrl + 'enterprises', enterprises ).pipe(
      map((result: IResultAddEnterprises) => {
        return result || new ResultAddEnterprises();
      })
    );
  }

  public editEnterprises(enterprises: IEnterprisesToServer, id: number): Observable<IResultAddEnterprises> {
    return this.httpClient.put(this.baseUrl + 'enterprises/' + id , enterprises ).pipe(
      map((result: IResultAddEnterprises) => {
        return result || new ResultAddEnterprises();
      })
    );
  }

  public getEnterprisesById(id: number): Observable<IEnterprisesToServer> {
    return this.httpClient.get(this.baseUrl + 'enterprises/' + id).pipe(
      map((result: IEnterprisesToServer) => {
        return result || new EnterprisesToServer();
      })
    );
  }

  public getListBranchesIndustryProductionOfFields(id: number): Observable<IBranches[]> {
    return this.httpClient.get(this.baseUrl + 'get-list-branches-production-of-fields/' + id).pipe(
      map((result: IBranches[]) => {
        return result || [];
      })
    );
  }

  public getListBranchesByFieldsId(id: number): Observable<IBranches[]> {
    return this.httpClient.get(this.baseUrl + 'fields/' + id + '/get-list-branches-by-fields-id').pipe(
      map((result: IBranches[]) => {
        return result || [];
      })
    );
  }

  public getListProductBranchesId(id: number): Observable<IProduction[]> {
    return this.httpClient.get(this.baseUrl + 'branches/' + id + '/productions').pipe(
      map((result: IProduction[]) => {
        return result || [];
      })
    );
  }

  public getListProductBranchesIds(ids: number[]): Observable<IProduction[]> {
    return this.httpClient.post(this.baseUrl + 'get-list-product-by-branches-ids/', {ids} ).pipe(
      map((result: IProduction[]) => {
        return result || [];
      })
    );
  }

  public getListEnergyConsumption(): Observable<IEnergy[]>{
    return this.httpClient.get(this.baseUrl + 'energies').pipe(
      map((result: IEnergy[]) => {
        return result || [];
      })
    );
  }

  public getListFieldsByFieldsId(fieldsId: number): Observable<IEnergyData[]> {
    return this.httpClient.get(this.baseUrl + 'get-list-fields-by-fields-id/' + fieldsId).pipe(
      map((result: IEnergyData[]) => {
        return result || [];
      })
    );
  }
}
