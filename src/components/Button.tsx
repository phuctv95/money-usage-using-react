export function Button({
  children,
  className,
  onClick,
}: Readonly<{
  children: any;
  className?: string;
  onClick?: () => void;
}>) {
  return (
    <button
      className={
        'border-2 font-semibold border-slate-200 px-2 py-1 rounded hover:bg-gray-100 hover:border-slate-400 ' +
        (className ?? '')
      }
      onClick={onClick}
    >
      {children}
    </button>
  );
}
