import type { ValidationError } from '../../types/schedule.types';

interface ErrorListProps {
  errors: ValidationError[];
}

export const ErrorList = ({ errors }: ErrorListProps) => {
  if (errors.length === 0) return null;

  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 md:p-6">
      <div className="flex items-start gap-3">
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
