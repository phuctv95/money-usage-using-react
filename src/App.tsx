import React from 'react';
import './App.css';
import {
  useMoneyUsage,
  useMoneyUsageDispatch,
} from './contexts/money-usage-context';
import { DayCostBlock } from './components/DayCost';
import { Button } from './components/Button';
import { DayCostActions } from './contexts/money-usage-reducer';

function App() {
  const moneyUsage = useMoneyUsage();
  const moneyUsageDispatch = useMoneyUsageDispatch();

  function handleAddDayCostBlock() {
    moneyUsageDispatch({ type: 'added_day_cost' } as DayCostActions.Add);
  }

  return (
    <>
      <div className="m-5">
        <Button onClick={handleAddDayCostBlock}>New day</Button>
      </div>
      <div className="grid grid-cols-4 gap-2 m-5">
        {moneyUsage.dayCosts.map((x) => (
          <div key={x.id}>
            <DayCostBlock dayCost={x} />
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
