import { ActivityType } from '../../../core/types/schedule.types';

export const getActivityLabel = (activity: ActivityType): string => {
  const labels: Record<ActivityType, string> = {
    [ActivityType.ASCENDING]: 'Subida',
    [ActivityType.INDUCTION]: 'Inducción',
    [ActivityType.DRILLING]: 'Perforación',
    [ActivityType.DESCENDING]: 'Bajada',
    [ActivityType.RESTING]: 'Descanso',
    [ActivityType.INACTIVE]: 'Inactivo'
  };
  return labels[activity];
};

export const getActivityColor = (activity: ActivityType): string => {
  const colors: Record<ActivityType, string> = {
    [ActivityType.ASCENDING]: 'bg-blue-500',
    [ActivityType.INDUCTION]: 'bg-purple-500',
    [ActivityType.DRILLING]: 'bg-emerald-500',
    [ActivityType.DESCENDING]: 'bg-orange-500',
    [ActivityType.RESTING]: 'bg-gray-400',
    [ActivityType.INACTIVE]: 'bg-gray-200'
  };
  return colors[activity];
};

export const formatDayRange = (start: number, end: number): string => {
  return `Días ${start}-${end}`;
};

export const calculateRealRestDays = (totalRestDays: number): number => {
  return totalRestDays - 2;
};
