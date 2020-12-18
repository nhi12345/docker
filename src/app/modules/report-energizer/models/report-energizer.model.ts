import { BranchesValue } from './../../declare-enterprises/models/enterprises.model';
export interface ReportEmission {
  id: number;
  year: number;
  taxCode: string;
  enterpriseName: string;
  province: string;
  employees: number;
  branches: BranchesValue[];
  energyProcess: Emission;
  productionProcess: Emission;
  totalCO2: number;
  electricCO2: number;
  branchNameAll: string;
}

export class ReportEmissionByField {
  public id: number;
  public year: number;
  public fieldName: string;
  public employees: number;
  public energyProcess: Emission;
  public productionProcess: Emission;
  public totalCO2: number;
  public co2inEnergyProcess: number;
  public co2inProductionProcess: number;
  public electricCO2: number;
}

export class Emission {
  public co2: number;
  public ch4: number;
  public n2O: number;
}

export interface ReportComsumption {
  id: number;
  year: number;
  fieldName: string;
  employees: number;
  antraxitCoal: number;
  bitumCoal: number;
  lignite: number;
  coke: number;
  peat: number;
  fuel: number;
  dooil: number;
  fooil: number;
  lpg: number;
  electric: number;
  bioGas: number;
  biomass: number;
}

export interface IndicatorReport {
  year: number;
  greenhouseGas: number;
  indirect: number;
  energyProcess: number;
  productionProcess: number;
  scatter: number;
  greenhouseGasCpmToProductionValue: number;
  emissionPerCapita: number;
  electric: number;
  energy: number;
  electricCpmToProductionValue: number;
  energyCpmToProductionValue: number;
  water: number;
  waterPerProductionValue: number;
  capacityOfRenewableElec: number;
  renewableElectric: number;
  proportionOfEnterpriseCertified: number;
}
