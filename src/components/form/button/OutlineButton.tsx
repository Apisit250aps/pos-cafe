import { ReactNode } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  loading?: boolean;
  className?: string;
}

export default function OutlineButton({
  children,
  loading,
  className,
  ...props
}: ButtonProps) {
  return (
    <button className={`btn btn-outline ${className}`} {...props}>
      {loading ? (
        <span className="loading loading-spinner loading-sm"></span>
      ) : (
        children
      )}
    </button>
  );
}
