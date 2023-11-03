import { Cost } from './cost';
import { DayCost } from './day-cost';

export interface MoneyUsage {
  costs: Cost[];
  dayCosts: DayCost[];
}
