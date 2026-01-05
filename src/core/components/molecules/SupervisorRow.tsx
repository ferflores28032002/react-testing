import { Tooltip } from '../atoms/Tooltip';
import type { DayActivity, ActivityType } from '../../types/schedule.types';

interface SupervisorRowProps {
  supervisorKey: 'supervisor1' | 'supervisor2' | 'supervisor3';
  supervisorName: string;
  chunk: DayActivity[];
  formatActivity: (activity: ActivityType) => string;
  getActivityBgClass: (activity: ActivityType) => string;
  getActivityTooltip: (activity: ActivityType, day: number, supervisorName: string) => string;
}

export const SupervisorRow = ({
  supervisorKey,
  supervisorName,
  chunk,
  formatActivity,
  getActivityBgClass,
  getActivityTooltip
}: SupervisorRowProps) => {
  return (
    <div className="grid gap-2 md:gap-4 items-center" style={{ gridTemplateColumns: '100px repeat(15, 1fr)' }}>
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-2 md:px-3 py-1.5 md:py-2 rounded-lg overflow-hidden">
        <span className="text-[10px] md:text-sm font-bold text-white block truncate">{supervisorName}</span>
      </div>
      {chunk.map((day, dayIdx) => {
        const activity = day[supervisorKey];
        return (
          <Tooltip
            key={dayIdx}
            position='top'
            content={getActivityTooltip(activity, day.day, supervisorName)}
          >
            <div
              className={`${getActivityBgClass(activity)} px-2 md:px-3 py-1.5 md:py-2 rounded flex items-center justify-center transition-all hover:scale-105 cursor-pointer`}
            >
              <span className="text-[10px] md:text-xs font-bold text-white">
                {formatActivity(activity)}
              </span>
            </div>
          </Tooltip>
        );
      })}
    </div>
  );
};
