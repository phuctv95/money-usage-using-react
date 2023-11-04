import { useState } from 'react';
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

  function handleDeleteCost(id: number) {
    moneyUsageDispatch({
      type: 'deleted_cost',
      costId: id,
      dayCostId: dayCost.id,
    } as CostActions.Delete);
  }

  return (
    <div className="group/card shadow-md p-3 border-2 inline-block w-full">
      <div className="flex items-center mb-2">
        <DatePicker
          value={dayCost.date}
          onChange={handleChangeDate}
          format="DD/MM"
          className="grow text-xl font-bold"
        />
        <Button
          onClick={handleRemove}
          borderless={true}
          isBold={false}
          className="right-0 text-gray-400 scale-y-90 opacity-0 group-hover/card:opacity-100"
        >
          <span className="material-symbols-outlined align-middle">delete</span>
        </Button>
      </div>
      <hr className="mb-3" />
      {costs.map((c) => (
        <div
          key={c.id}
          className="group/row grid grid-cols-10 gap-1 items-center text-sm h-10"
        >
          <div className="col-span-6">{c.description}</div>
          <div className="col-span-3">
            {c.value.toLocaleString()}
            <span className="text-xs italic ml-1">VND</span>
          </div>
          <div className="col-span-1 justify-self-end">
            <Button
              borderless={true}
              isBold={false}
              onClick={() => handleDeleteCost(c.id)}
              className="text-gray-400 hidden group-hover/row:inline-block"
            >
              <span className="material-symbols-outlined align-middle">
                close
              </span>
            </Button>
          </div>
        </div>
      ))}
      {costs.length > 0 && <hr className="my-3" />}
      <div className="grid grid-cols-10 gap-1">
        <Input
          value={description}
          onChange={handleDescriptionChange}
          placeholder="Pay for..."
          className="col-span-6 h-8 text-xs px-1"
        />
        <Input
          value={cost}
          onChange={handleCostChange}
          placeholder="... (000 VND)"
          type="number"
          className="col-span-3 h-8 text-xs px-1"
          onKeyUp={(key) => key === 'Enter' && handleAddCost()}
        />
        <Button
          onClick={handleAddCost}
          paddingless={true}
          className="col-span-1 h-8 text-xs"
        >
          Add
        </Button>
      </div>
    </div>
  );
}
