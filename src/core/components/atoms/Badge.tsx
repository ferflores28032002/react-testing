import { ActivityType } from '../../types/schedule.types';
import { getActivityColor } from '../../../features/schedule/helpers/activityHelpers';

interface BadgeProps {
  activity: ActivityType;
}

export const Badge = ({ activity }: BadgeProps) => {
  const color = getActivityColor(activity);
  
  return (
    <span className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-bold text-white ${color} shadow-sm`}>
      {activity}
    </span>
  );
};
