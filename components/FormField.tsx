import React, { useCallback } from "react";

const FormField = ({
  id,
  label,
  options,
  type,
  placeholder,
  value,
  as = "input",
  onChange,
}: FormFieldProps) => {
  return (
    <div className="form-field">
      <label htmlFor={id}>{label}</label>
      {as === "textarea" ? (
        <textarea
          id={id}
          name={id}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
        />
      ) : as === "select" ? (
        <select id={id} name={id} value={value} onChange={onChange}>
          {options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type="text"
          id={id}
          name={id}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
        />
      )}
    </div>
  );
};

export default FormField;
