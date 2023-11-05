export function Button({
  children,
  className,
  size = 'normal',
  onClick,
  borderless = false,
  paddingless = false,
  isBold = true,
}: Readonly<{
  children: any;
  className?: string;
  size?: 'normal' | 'small';
  onClick?: () => void;
  borderless?: boolean;
  paddingless?: boolean;
  isBold?: boolean;
}>) {
  return (
    <button
      className={
        'border-slate-200 py-1 rounded hover:bg-gray-100 hover:border-slate-400' +
        (className ? ` ${className}` : '') +
        (borderless ? '' : ' border-2') +
        (paddingless ? '' : ' px-2') +
        (isBold ? ' font-semibold' : '') +
        (size === 'normal' ? '' : ' h-8 text-xs')
      }
      onClick={onClick}
    >
      {children}
    </button>
  );
}
