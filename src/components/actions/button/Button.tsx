interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  className?: string; // Additional class name for the button container.
  children?:React.ReactNode
}
export default function Button({
  children,
  loading = false,
  className,
  ...props
}: ButtonProps) {
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
