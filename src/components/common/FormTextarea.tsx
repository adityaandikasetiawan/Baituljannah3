import React from 'react';

interface FormTextareaProps {
  label: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
  disabled?: boolean;
  rows?: number;
  error?: string;
}

export const FormTextarea: React.FC<FormTextareaProps> = ({
  label,
  placeholder,
  value,
  onChange,
  required = false,
  disabled = false,
  rows = 4,
  error
}) => {
  return (
    <div className="mb-4">
      <label className="block text-sm mb-2 text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        rows={rows}
        className={`input-field resize-none ${error ? 'border-red-500' : ''} ${disabled ? 'bg-gray-100' : ''}`}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};
