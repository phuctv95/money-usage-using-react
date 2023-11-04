export function Button({
  children,
  className,
  onClick,
  borderless = false,
  isBold = true,
}: Readonly<{
  children: any;
  className?: string;
  onClick?: () => void;
  borderless?: boolean;
  isBold?: boolean;
}>) {
  return (
    <button
      className={
        'border-slate-200 px-2 py-1 rounded hover:bg-gray-100 hover:border-slate-400' +
        (className ? ` ${className}` : '') +
        (borderless ? '' : ' border-2') +
        (isBold ? ' font-semibold' : '')
      }
      onClick={onClick}
    >
      {children}
    </button>
  );
}
