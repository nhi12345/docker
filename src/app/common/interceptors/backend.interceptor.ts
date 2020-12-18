import { Injectable, Injector } from '@angular/core';
import { of, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import {
  usersData,
  listEnterprises, listFields, energyConsumption
} from 'src/app/common/data/fake-back-end';
import {
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';

@Injectable()
export class BackendInterceptor implements HttpInterceptor {
  private usersData = usersData;
  private listEnterprises = listEnterprises;
  private listFields = listFields;
  private listEnergyConsumption = energyConsumption;

  constructor(private injector: Injector) { }
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const { url, method } = request;
    let newHttpResponse: Observable<HttpResponse<any>>;
    const typeResponse = url.split('/');
    if (typeResponse[2] === 'localhost:4200:'){
      switch (true) {
        case method === 'GET' && url === 'http://localhost:4200/users':
          newHttpResponse = of(
            new HttpResponse({ status: 200, body: usersData })
          );
          break;
        case method === 'POST' && url === 'http://localhost:4200:/login':
          newHttpResponse = this.login(request);
          break;
        case method === 'GET' && url === 'http://localhost:4200:/fields':
          newHttpResponse = this.geListFields(request);
          break;
        case method === 'GET' &&
          url.match('get-list-enterprises-by-field-id') != null:
          newHttpResponse = this.getListEnterprisesByFieldId(request);
          break;
        case method === 'GET' &&
          url.match(/\/fields\/\d+$/) != null:
          newHttpResponse = this.getFieldsByFieldsId(request);
          break;
        case method === 'POST' &&
          url === 'http://localhost:4200:/enterprises':
          newHttpResponse = this.addEnterprises(request);
          break;
        case method === 'GET' &&
          url.match('enterprises') != null:
          newHttpResponse = this.getEnterprises(request);
          break;
        case method === 'GET' &&
          url.match(/\/get-list-branches-production-of-fields\/\d+$/) != null:
          newHttpResponse = this.getListBranchesIndustryProductionOfFields(request);
          break;
        case method === 'GET' &&
          url.match('get-list-branches-by-fields-id') != null:
          newHttpResponse = this.getListBranchesByFieldsId(request);
          break;
        case method === 'POST' &&
          url === 'http://localhost:4200:/get-list-product-by-branches-ids/':
          newHttpResponse = this.getListProductBranchesIds(request);
          break;
        case method === 'GET' &&
          url.match('productions') != null:
          newHttpResponse = this.getListProductBranchesId(request);
          break;
        case method === 'GET' &&
          url === 'http://localhost:4200:/energies/':
          newHttpResponse = this.getListEnergyConsumption(request);
          break;
        case method === 'GET' &&
          url === 'http://localhost:4200:/reports/':
          newHttpResponse = this.getListEnergyConsumption(request);
          break;
        default:
          newHttpResponse = null;
          break;
      }
    }
    return newHttpResponse || next.handle(request);

  }

  private login(request: HttpRequest<any>): Observable<HttpResponse<any>> {
    const email = request.body.email;
    const password = request.body.password;

    const user = this.usersData.find((resultUser) => {
      return resultUser.email === email && resultUser.password === password;
    });

    if (user) {
      return of(
        new HttpResponse({ status: 200, body: { status: 'SUCCESS', user: {...user} } })
      ).pipe(delay(500));
    }
    else {
      return of(
        new HttpResponse({
          status: 200,
          body: {
            status: 'ERROR',
            message: 'user name or password incorrect',
          },
        })
      ).pipe(delay(500));
    }
  }

  private getFieldsByFieldsId(request: HttpRequest<any>): Observable<HttpResponse<any>> {
    const fieldId = Number(this.getIdParameterFromURL(request.url));

    const fields = this.listFields.find((fieldsItem) => {
      return fieldsItem.id === fieldId;
    });

    return of(
      new HttpResponse({ status: 200, body: {...fields} })
    ).pipe(delay(500));
  }

  private getListEnterprisesByFieldId(request: HttpRequest<any>): Observable<HttpResponse<any>> {
    const fieldId = Number(this.getIdParameterFromURL(request.url, 4 ));

    const listEnterprisesByFieldId = this.listEnterprises.filter((enterprises) => {
       return enterprises.fieldId === fieldId;
    });

    return of(
      new HttpResponse({ status: 200, body: [...listEnterprisesByFieldId] })
    ).pipe(delay(500));
  }

  private addEnterprises(request: HttpRequest<any>): Observable<HttpResponse<any>> {
    const enterprises = request.body;
    enterprises.id = new Date().getTime();

    this.listEnterprises.push(enterprises);

    return of(
      new HttpResponse({
        status: 200,
        body: { status: 'SUCCESS', enterprises : {...enterprises} },
      })
    ).pipe(delay(500));
  }

  private getEnterprises(request: HttpRequest<any>): Observable<HttpResponse<any>> {
    const idEnterprises = Number(this.getIdParameterFromURL(request.url));

    const enterprises = this.listEnterprises.find((resultEnterprises) => {
      return resultEnterprises.id === idEnterprises;
    });

    return of(new HttpResponse({ status: 200, body: {...enterprises} })).pipe(delay(500));
  }

  private geListFields(request: HttpRequest<any>): Observable<HttpResponse<any>> {
    const resultListFields = this.listFields.map((itemField) => {
      return {
        id: itemField.id,
        name: itemField.name
      };
    });
    return of(new HttpResponse({ status: 200, body: [...resultListFields] })).pipe(delay(500));
  }

  private getListBranchesByFieldsId(request: HttpRequest<any>): Observable<HttpResponse<any>> {
    const idFields = Number(this.getIdParameterFromURL(request.url, 4 ));

    const itemFields = this.listFields.find((resultListFields) => {
      return resultListFields.id === idFields;
    });

    const listBranch = itemFields.listBranches.map((itemField) => {
      return {
        id: itemField.id,
        name: itemField.name,
        listProduct: itemField.listProduct
      };
    });

    return of(new HttpResponse({ status: 200, body: [...listBranch] })).pipe(delay(500));
  }

  private getListProductBranchesId(request: HttpRequest<any>): Observable<HttpResponse<any>> {
    const branchesId = Number(this.getIdParameterFromURL(request.url, 4));

    const itemFields = this.listFields.find((fields) => {
      return fields.listBranches.find((branch) => {
        return branch.id === branchesId;
      });
    });

    const itemBranches = itemFields.listBranches.find((branch) => {
      return branch.id === branchesId;
    });

    const listProduct = itemBranches.listProduct;

    return of(new HttpResponse({ status: 200, body: [...listProduct] })).pipe(delay(500));
  }

  private getListProductBranchesIds(request: HttpRequest<any>): Observable<HttpResponse<any>> {
    const branchesId = request.body.ids;

    const listProduct = [];

    branchesId.forEach(branchId => {

      const itemFields = this.listFields.find((fields) => {
        return fields.listBranches.find((branch) => {
          return branch.id === branchId;
        });
      });

      const itemBranches = itemFields.listBranches.find((branch) => {
        return branch.id === branchId;
      });

      itemBranches.listProduct.forEach(product => {
         const productNew: any = {};
         productNew.name = product.name;
         productNew.productionId = product.productionId;
         productNew.unit = product.unit;
         productNew.branchId = itemBranches.id;
         listProduct.push(productNew);
      });

    });


    return of(new HttpResponse({ status: 200, body: [...listProduct] })).pipe(delay(500));
  }

  private getListBranchesIndustryProductionOfFields(request: HttpRequest<any>): Observable<HttpResponse<any>> {
    const idFields = Number(this.getIdParameterFromURL(request.url));

    const itemFields = this.listFields.find((resultListFields) => {
      return resultListFields.id === idFields;
    });

    const listBranch = itemFields.listBranches.map((itemField) => {
      return {
        id: itemField.id,
        name: itemField.name,
        listProduct: itemField.listProduct
      };
    });

    return of(new HttpResponse({ status: 200, body: [...listBranch] })).pipe(delay(500));
  }

  private getListEnergyConsumption(request: HttpRequest<any>): Observable<HttpResponse<any>>{
    const listEnergyConsumption = this.listEnergyConsumption;
    return of(new HttpResponse({ status: 200, body: [...listEnergyConsumption] })).pipe(delay(500));
  }

  private getIdParameterFromURL(url: string, position: number = -1): string {
    const urlParts = url.split('/');
    if (position  === -1){
      return urlParts[urlParts.length - 1];
    }
    else{
      return urlParts[position];
    }
  }

}
