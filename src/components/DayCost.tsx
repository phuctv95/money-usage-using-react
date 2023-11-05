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
import { Icon } from './Icon';
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
          size="large"
          isBold={true}
          className="grow"
        />
        <Button
          onClick={handleRemove}
          borderless={true}
          isBold={false}
          className="right-0 invisible group-hover/card:visible"
        >
          <Icon name="delete" />
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
              className="invisible group-hover/row:visible"
            >
              <Icon name="close" />
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
          size="small"
          className="col-span-6"
        />
        <Input
          value={cost}
          onChange={handleCostChange}
          placeholder="... (000 VND)"
          type="number"
          size="small"
          className="col-span-3"
          onKeyUp={(key) => key === 'Enter' && handleAddCost()}
        />
        <Button
          onClick={handleAddCost}
          paddingless={true}
          size="small"
          className="col-span-1"
        >
          Add
        </Button>
      </div>
    </div>
  );
}
