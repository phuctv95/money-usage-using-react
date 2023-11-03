import moment from 'moment';
import { Cost } from '../models/cost';
import { MoneyUsage } from '../models/money-usage';
import { MoneyUsageStorage } from '../services/money-usage-storage';

export namespace DayCostActions {
  export type ChangeDate = {
    type: 'changed_date';
    id: number;
    value: Date;
  };

  export type Add = {
    type: 'added_day_cost';
  };

  export type Remove = {
    type: 'removed_day_cost';
    id: number;
  };
}

export namespace CostActions {
  export type Add = {
    type: 'added_cost';
    id: number;
    description: string;
    cost: number;
  };
}

export type MoneyUsageAction =
  | DayCostActions.ChangeDate
  | DayCostActions.Add
  | DayCostActions.Remove
  | CostActions.Add
  | undefined;
export function dayCostsReducer(
  moneyUsage: MoneyUsage,
  action: MoneyUsageAction
): MoneyUsage {
  let result: MoneyUsage | undefined;
  switch (action?.type) {
    case 'changed_date':
      result = {
        ...moneyUsage,
        dayCosts: moneyUsage.dayCosts.map((x) =>
          x.id === action.id
            ? {
                ...x,
                date: action.value,
              }
            : x
        ),
      };
      result.dayCosts.sort((x, y) => x.date.getTime() - y.date.getTime());
      MoneyUsageStorage.saveToStorage(result);
      return result;
    case 'added_cost':
      const newCost = {
        id: Math.max(0, ...moneyUsage.costs.map((x) => x.id)) + 1,
        description: action.description,
        value: action.cost,
      } as Cost;
      result = {
        costs: [...moneyUsage.costs, newCost],
        dayCosts: moneyUsage.dayCosts.map((x) =>
          x.id === action.id
            ? {
                ...x,
                costIds: [...x.costIds, newCost.id],
              }
            : x
        ),
      };
      MoneyUsageStorage.saveToStorage(result);
      return result;
    case 'added_day_cost':
      result = {
        ...moneyUsage,
        dayCosts: [
          ...moneyUsage.dayCosts,
          {
            id: Math.max(0, ...moneyUsage.dayCosts.map((x) => x.id)) + 1,
            date: moment().toDate(),
            costIds: [],
          },
        ],
      };
      MoneyUsageStorage.saveToStorage(result);
      return result;
    case 'removed_day_cost':
      const dayCost = moneyUsage.dayCosts.find((x) => x.id === action.id)!;
      result = {
        costs: moneyUsage.costs.filter((x) => !dayCost.costIds.includes(x.id)),
        dayCosts: moneyUsage.dayCosts.filter((x) => x.id !== dayCost.id),
      };
      MoneyUsageStorage.saveToStorage(result);
      return result;
    default:
      return moneyUsage;
  }
}
