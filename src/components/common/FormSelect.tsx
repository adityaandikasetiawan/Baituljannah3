import React from 'react';

interface FormSelectProps {
  label: string;
  options: { value: string; label: string }[];
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
  disabled?: boolean;
  error?: string;
}

export const FormSelect: React.FC<FormSelectProps> = ({
  label,
  options,
  value,
  onChange,
  required = false,
  disabled = false,
  error
}) => {
  return (
    <div className="mb-4">
      <label className="block text-sm mb-2 text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <select
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        className={`input-field ${error ? 'border-red-500' : ''} ${disabled ? 'bg-gray-100' : ''}`}
      >
        <option value="">Pilih {label}</option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};
