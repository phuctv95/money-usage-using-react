import moment from 'moment';
import { useRef } from 'react';

export function DatePicker({
  value,
  format,
  className,
  onChange,
}: Readonly<{
  value: Date;
  format: string;
  className?: string;
  onChange?: (value: Date) => void;
}>) {
  const datePickerRef = useRef<HTMLInputElement>(null);
  const datePickerNativeFormat = 'YYYY-MM-DD';

  function handClickDate() {
    datePickerRef.current?.showPicker();
  }

  function handleOnChange(value: string) {
    onChange?.(moment(value, datePickerNativeFormat).toDate());
  }

  return (
    <div className={'relative inline-block ' + (className ?? '')}>
      <button
        onClick={handClickDate}
        className="hover:bg-slate-200 hover:outline-slate-200 hover:outline hover:outline-2 cursor-pointer rounded"
      >
        {moment(value).format(format)}
      </button>
      <input
        type="date"
        className="absolute -z-10 opacity-0 left-0"
        ref={datePickerRef}
        value={moment(value).format(datePickerNativeFormat)}
        onChange={(e) => handleOnChange(e.target.value)}
      />
    </div>
  );
}
