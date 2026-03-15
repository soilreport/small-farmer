import React, { useState } from "react";
import type { InputHTMLAttributes } from "react";
import "./Input.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  validator?: (value: string) => string | null;
}

const Input = ({ label, validator, ...props }: InputProps) => {
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (validator) setError(validator(e.target.value));
    if (props.onChange) props.onChange(e);
  };

  return (
    <div className="input-wrapper">
      {label && <label>{label}</label>}
      <input
        {...props}
        onChange={handleChange}
      />
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Input;