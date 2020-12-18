import { Injectable } from '@angular/core';
import { communes } from '../data/commune-data';
import { districts } from '../data/district-data';
import { provinces } from '../data/province-data';

export interface Province {
  code: string;
  name: string;
}

export interface DistrictOrCommune {
  code: string;
  name: string;
  parent_code: string;
}

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  private provinces: Province[] = provinces;
  private districts: DistrictOrCommune[] = districts;
  private communes: DistrictOrCommune[] = communes;

  public getProvince(code: string): Province {
    return this.provinces.find((p) => p.code === code);
  }

  public getDistrict(code: string): DistrictOrCommune {
    return this.districts.find((d) => d.code === code);
  }

  public getCommune(code: string): DistrictOrCommune {
    return this.communes.find((c) => c.code === code);
  }

  public getListDistrictsByProvince(code: string): DistrictOrCommune[] {
    return this.districts.filter((d) => d.parent_code === code);
  }

  public getListCommunesByDistrict(code: string): DistrictOrCommune[] {
    return this.communes.filter((c) => c.parent_code === code);
  }

  public getListProvinces(): Province[] {
    return this.provinces.slice();
  }
}
