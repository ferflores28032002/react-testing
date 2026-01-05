import { ScheduleRow } from '../molecules/ScheduleRow';
import type { DayActivity, ValidationError } from '../../types/schedule.types';

interface ScheduleTableProps {
  schedule: DayActivity[];
  errors: ValidationError[];
}

export const ScheduleTable = ({ schedule, errors }: ScheduleTableProps) => {
  const errorDays = new Set(errors.map(e => e.day));

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200">
      <table className="w-full">
        <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
          <tr>
            <th className="px-6 py-4 text-center text-sm font-bold text-gray-700 uppercase tracking-wider">
              Día
            </th>
            <th className="px-6 py-4 text-center text-sm font-bold text-gray-700 uppercase tracking-wider">
              Supervisor 1
            </th>
            <th className="px-6 py-4 text-center text-sm font-bold text-gray-700 uppercase tracking-wider">
              Supervisor 2
            </th>
            <th className="px-6 py-4 text-center text-sm font-bold text-gray-700 uppercase tracking-wider">
              Supervisor 3
            </th>
            <th className="px-6 py-4 text-center text-sm font-bold text-gray-700 uppercase tracking-wider">
              Perforando
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {schedule.map((day) => (
            <ScheduleRow 
              key={day.day} 
              day={day} 
              hasError={errorDays.has(day.day)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
