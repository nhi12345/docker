import {
  IEnergyData,
  IEnterprises,
  IEnterprisesToServer,
  IFields,
  IBranches,
  IDropdown,
  IBranchesValue,
  IProductionData,
  IProduction,
  IResultAddEnterprises,
} from '../abstract/enterprises.interface';

export class Enterprises implements IEnterprises {
  id: number;
  fieldId: number;
  name: string;
  foundedYear: number;
  taxCode: string;
  phoneNumber: string;
  province: string;
  district: string;
  town: string;
  xcoordinate: string;
  ycoordinate: string;
  productionValue: number;
  employees: number;
  branches: BranchesValue[];
  branchNameAll: string;
}
export class EnterprisesToServer implements IEnterprisesToServer {
  id: number;
  name: string;
  foundedYear: number;
  taxCode: string;
  phoneNumber: string;
  province: string;
  district: string;
  town: string;
  xcoordinate: string;
  ycoordinate: string;
  productionValue: number;
  employees: number;
  fieldId: number;
  branches: BranchesValue[];
  productions: ProductionData[];
  energies: EnergyData[];
}

export class ResultAddEnterprises implements IResultAddEnterprises {
  status: string;
  miningIndustry: IEnterprises;
}

export class Branches implements IBranches {
  id: number;
  name: string;
  displayName: string;
  listProduct: IProduction[];
}

export class BranchesValue implements IBranchesValue {
  id: number;
  name: string;
}

export class ProductionData implements IProductionData {
  enterpriseId: number;
  productionId: number;
  branchId: number;
  displayName: string;
  name: string;
  production: string;
  unit: string;
  volume: number;
}

export class EnergyData implements IEnergyData {
  productionId: number;
  energyId: number;
  displayName: string;
  name: string;
  unit: string;
  volume: number;
}

export class Fields implements IFields {
  id: number;
  name: string;
  listBranches: IBranches[];
}

export class Dropdown implements IDropdown {
  // tslint:disable-next-line: variable-name
  item_id: number;
  // tslint:disable-next-line: variable-name
  item_text: string;
}
