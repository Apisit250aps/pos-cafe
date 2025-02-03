interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  className?: string;
}

export default function InputField({ label, ...props }: InputFieldProps) {
  return (
    <label className="form-control w-full">
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      <input
        {...props}
        className={`input input-bordered w-full ${props.className}`}
      />
    </label>
  );
}
