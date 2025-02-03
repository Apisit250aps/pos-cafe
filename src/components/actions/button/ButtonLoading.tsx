interface ButtonLoadingProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  className?: string; // Additional class name for the button container.
  children?:React.ReactNode
}
export default function ButtonLoading({
  children,
  loading = false,
  className,
  ...props
}: ButtonLoadingProps) {
  return (
    <>
      <button className={`btn ${className}`} {...props}>
        {loading ? (
          <span className="loading loading-spinner loading-sm"></span>
        ) : (
          <>{children}</>
        )}
      </button>
    </>
  );
}
