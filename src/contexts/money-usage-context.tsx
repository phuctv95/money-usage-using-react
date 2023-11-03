import React, { Dispatch, createContext, useContext, useReducer } from 'react';
import { MoneyUsageStorage } from '../services/money-usage-storage';
import {
  MoneyUsageAction,
  dayCostsReducer as moneyUsageReducer,
} from './money-usage-reducer';
import { MoneyUsage } from '../models/money-usage';

const MoneyUsageContext = createContext<MoneyUsage>({
  costs: [],
  dayCosts: [],
});
const MoneyUsageDispatchContext = createContext<Dispatch<MoneyUsageAction>>(
  () => {}
);

export function MoneyUsageProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [moneyUsage, dispatch] = useReducer(
    moneyUsageReducer,
    MoneyUsageStorage.getFromStorage()
  );

  return (
    <MoneyUsageContext.Provider value={moneyUsage}>
      <MoneyUsageDispatchContext.Provider value={dispatch}>
        {children}
      </MoneyUsageDispatchContext.Provider>
    </MoneyUsageContext.Provider>
  );
}

export function useMoneyUsage() {
  return useContext(MoneyUsageContext);
}

export function useMoneyUsageDispatch() {
  return useContext(MoneyUsageDispatchContext);
}
