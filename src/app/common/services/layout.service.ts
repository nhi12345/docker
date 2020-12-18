import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from '../models/auth.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IFields } from 'src/app/modules/declare-enterprises/abstract/enterprises.interface';

@Injectable({ providedIn: 'root' })
export class LayoutService {
  public user: UserModel;

  private baseUrlFake = environment.baseURlFake;
  // private baseUrl = environment.baseURl;

  constructor(public router: Router, private httpClient: HttpClient) {}

  public getListFields(): Observable<IFields[]> {
    return this.httpClient.get(this.baseUrlFake + 'fields').pipe(
      map((result: IFields[]) => {
        result.sort((a, b) => a.id - b.id);
        return result;
      })
    );
  }
}
