import { Fragment, useState } from 'react';
import {
  useMoneyUsage,
  useMoneyUsageDispatch,
} from '../contexts/money-usage-context';
import { CostActions, DayCostActions } from '../contexts/money-usage-reducer';
import { DayCost } from '../models/day-cost';
import { Button } from './Button';
import { Input } from './Input';
import { DatePicker } from './DatePicker';
export function DayCostBlock({ dayCost }: Readonly<{ dayCost: DayCost }>) {
  const moneyUsage = useMoneyUsage();
  const moneyUsageDispatch = useMoneyUsageDispatch();
  const [description, setDescription] = useState('');
  const [cost, setCost] = useState('');
  const costs = moneyUsage.costs.filter((x) => dayCost.costIds.includes(x.id));

  function handleDescriptionChange(value: string) {
    setDescription(value);
  }

  function handleCostChange(value: string) {
    setCost(value);
  }

  function handleChangeDate(value: Date) {
    moneyUsageDispatch({
      type: 'changed_date',
      id: dayCost.id,
      value,
    } as DayCostActions.ChangeDate);
  }

  function handleRemove() {
    moneyUsageDispatch({
      type: 'removed_day_cost',
      id: dayCost.id,
    } as DayCostActions.Remove);
  }

  function handleAddCost() {
    moneyUsageDispatch({
      type: 'added_cost',
      id: dayCost.id,
      description,
      cost: +(cost || 0) * 1000,
    } as CostActions.Add);
    setDescription('');
    setCost('');
  }

  return (
    <div className="shadow-md p-3 border-2 inline-block w-full">
      <div className="relative mb-2">
        <DatePicker
          value={dayCost.date}
          onChange={handleChangeDate}
          format="DD/MM"
          className="text-xl font-bold"
        />
        <Button
          onClick={handleRemove}
          borderless={true}
          isBold={false}
          className="absolute right-0 font-mono text-gray-400 scale-y-90"
        >
          x
        </Button>
      </div>
      <hr className="mb-3" />
      <div className="grid grid-cols-6 gap-1 text-sm">
        {costs.map((c) => (
          <Fragment key={c.id}>
            <div className="col-span-4">{c.description}</div>
            <div className="col-span-2">
              {c.value.toLocaleString()}
              <span className="text-xs italic ml-1">VND</span>
            </div>
          </Fragment>
        ))}
      </div>
      {costs.length > 0 && <hr className="my-3" />}
      <div className="grid grid-cols-6 gap-1">
        <Input
          value={description}
          onChange={handleDescriptionChange}
          placeholder="Pay for..."
          className="col-span-3 h-8 text-xs px-1"
        />
        <Input
          value={cost}
          onChange={handleCostChange}
          placeholder="... (000 VND)"
          className="col-span-2 h-8 text-xs px-1"
        />
        <Button onClick={handleAddCost} className="col-span-1 h-8 text-xs px-0">
          Add
        </Button>
      </div>
    </div>
  );
}
