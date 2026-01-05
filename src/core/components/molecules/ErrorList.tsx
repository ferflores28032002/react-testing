import type { ValidationError } from '../../types/schedule.types';

interface ErrorListProps {
  errors: ValidationError[];
}

export const ErrorList = ({ errors }: ErrorListProps) => {
  if (errors.length === 0) return null;

  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 md:p-6">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 md:h-6 md:w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <div className="flex-1">
          <h3 className="text-base md:text-lg font-bold text-red-800 mb-2">
            {errors.length === 1 ? 'Error de Validación' : `Errores de Validación (${errors.length})`}
          </h3>
          <ul className="space-y-1.5">
            {errors.map((error, index) => (
              <li key={index} className="text-sm text-red-700 flex items-start gap-2">
                <span className="inline-block w-1.5 h-1.5 bg-red-500 rounded-full mt-1.5 flex-shrink-0"></span>
                <span className="flex-1">{error.message}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
