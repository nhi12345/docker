export interface IEnterprises {
  id: number;
  name: string;
  fieldId: number;
  foundedYear: number;
  province: string;
  district: string;
  town: string;
  xcoordinate: string;
  ycoordinate: string;
  productionValue: number;
  employees: number;
  branches: IBranchesValue[];
  branchNameAll: string;
}

export interface IEnterprisesToServer {
  id: number;
  name: string;
  phoneNumber: string;
  taxCode: string;
  foundedYear: number;
  province: string;
  district: string;
  town: string;
  xcoordinate: string;
  ycoordinate: string;
  productionValue: number;
  employees: number;
  fieldId: number;
  branches: IBranchesValue[];
  productions: IProductionData[];
  energies: IEnergyData[];
}

export interface IResultAddEnterprises {
  status: string;
  miningIndustry: IEnterprises;
}

export interface IFields {
  id: number;
  name: string;
  listBranches: IBranches[];
}

export interface IBranches {
  id: number;
  name: string;
  displayName: string;
  listProduct: IProduction[];
}

export interface IBranchesValue {
  id: number;
  name: string;
}

export interface IProductionData {
  enterpriseId: number;
  productionId: number;
  branchId: number;
  displayName: string;
  name: string;
  production: string;
  unit: string;
  volume: number;
}

export interface IProduction {
  branchId: number;
  id: number;
  name: string;
  unit: string;
}

export interface IEnergyData {
  productionId: number;
  energyId: number;
  displayName: string;
  name: string;
  unit: string;
  volume: number;
}

export interface IEnergy {
  id: number;
  name: string;
  unit: string;
}

export interface IDropdown {
  item_id: number;
  item_text: string;
}
