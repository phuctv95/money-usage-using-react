import moment from 'moment';
import { MoneyUsage } from '../models/money-usage';

export class MoneyUsageStorage {
  static readonly moneyUsageKey = 'MONEY_USAGE';

  static saveToStorage(value: MoneyUsage) {
    localStorage.setItem(
      MoneyUsageStorage.moneyUsageKey,
      JSON.stringify(value)
    );
  }

  static getFromStorage(): MoneyUsage {
    const result: MoneyUsage = JSON.parse(
      localStorage.getItem(MoneyUsageStorage.moneyUsageKey)!
    ) ?? {
      costs: [],
      dayCosts: [],
    };

    result.dayCosts.forEach(
      (x) => (x.date = moment(x.date as unknown as string).toDate())
    );

    return result;
  }
}
