interface InputFieldProps
  extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  altLabel?: string;
  className?: string;
}

export default function TextArea({
  label,
  altLabel,
  ...props
}: InputFieldProps) {
  return (
    <label className="form-control">
      <div className="label">
        <span className="label-text">{label}</span>
        <span className="label-text-alt">{altLabel}</span>
      </div>
      <textarea
        className="textarea textarea-bordered h-24"
        {...props}
      ></textarea>
    </label>
  );
}
