import { forwardRef } from 'react';
import { FormErrorMessage } from './FormErrorMessage';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`w-full px-4 py-2.5 rounded-lg border ${error ? 'border-red-500' : 'border-gray-200'
            } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${className}`}
          {...props}
        />
        {error && (
          <FormErrorMessage
            message={error}
          />)}
      </div>
    );
  }
);

Input.displayName = 'Input';
