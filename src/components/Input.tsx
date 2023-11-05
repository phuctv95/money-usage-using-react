export function Input({
  placeholder,
  className,
  size = 'normal',
  value,
  type = 'text',
  onChange,
  onKeyUp,
}: Readonly<{
  placeholder?: string;
  className?: string;
  size?: 'normal' | 'small';
  value?: string;
  type?: 'text' | 'number';
  onChange?: (text: string) => void;
  onKeyUp?: (key: string) => void;
}>) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      onKeyUp={(e) => onKeyUp?.(e.key)}
      className={
        'border-2 border-slate-200 bg-slate-100 rounded outline-none py-1 px-2 focus:border-slate-400 ' +
        (className ?? '') +
        (size === 'normal' ? '' : ' h-8 text-xs')
      }
    />
  );
}
