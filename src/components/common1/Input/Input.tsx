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
    <div className="mb-4">
      {label && <label className="block mb-1">{label}</label>}
      <input
        {...props}
        onChange={handleChange}
        className="w-full border rounded px-2 py-1 dark:bg-gray-700 dark:border-gray-600"
      />
      {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default Input;