interface SelectionProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  field?: string;
  optionField?: string;
  indexDefault?: boolean;
  options: Record<string, unknown>[] | string[];
  label: string;
}

export default function SelectField({
  options,
  field,
  optionField,
  label,
  indexDefault = false,
  ...props
}: SelectionProps) {
  return (
    <label className="form-control w-full">
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      <select className="select select-bordered w-full" {...props}>
        {indexDefault ? (
          <option disabled value={''}>
            Select
          </option>
        ) : null}
        {options.map((item, index) => {
          const value =
            field && typeof item === 'object'
              ? String((item as Record<string, unknown>)[field])
              : String(item);

          const displayText =
            optionField && typeof item === 'object'
              ? String((item as Record<string, unknown>)[optionField])
              : String(item);
          return (
            <option key={index} value={value}>
              {displayText}
            </option>
          );
        })}
      </select>
    </label>
  );
}
