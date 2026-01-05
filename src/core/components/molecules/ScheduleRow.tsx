import { Badge } from '../atoms/Badge';
import type { DayActivity } from '../../types/schedule.types';

interface ScheduleRowProps {
  day: DayActivity;
  hasError?: boolean;
}

export const ScheduleRow = ({ day, hasError }: ScheduleRowProps) => {
  return (
    <tr className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
      hasError ? 'bg-red-50' : ''
    }`}>
      <td className="px-6 py-4 text-center font-bold text-gray-900">
        {day.day}
      </td>
      <td className="px-6 py-4 text-center">
        <Badge activity={day.supervisor1} />
      </td>
      <td className="px-6 py-4 text-center">
        <Badge activity={day.supervisor2} />
      </td>
      <td className="px-6 py-4 text-center">
        <Badge activity={day.supervisor3} />
      </td>
      <td className="px-6 py-4 text-center">
        <span className={`inline-flex items-center justify-center w-10 h-10 rounded-full font-bold text-white ${
          day.activeDrillers === 2 ? 'bg-emerald-500' : 
          day.activeDrillers === 1 ? 'bg-orange-500' : 
          day.activeDrillers === 3 ? 'bg-red-500' : 
          'bg-gray-400'
        }`}>
          {day.activeDrillers}
        </span>
      </td>
    </tr>
  );
};
