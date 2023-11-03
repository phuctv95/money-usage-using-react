export function Input({
  placeholder,
  className,
  value,
  onChange,
}: Readonly<{
  placeholder?: string;
  className?: string;
  value?: string;
  onChange?: (text: string) => void;
}>) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      className={
        'border-2 border-slate-200 bg-slate-100 rounded outline-none py-1 px-2 focus:border-slate-400 ' +
        (className ?? '')
      }
    />
  );
}
