import { useMemo, useCallback } from 'react';
import type { DayActivity, ScheduleConfig, ActivityType } from '../../../core/types/schedule.types';

export const SUPERVISORS = [
  { key: 'supervisor1' as const, nameKey: 'supervisor1Name' as const, defaultName: 'Supervisor 1' },
  { key: 'supervisor2' as const, nameKey: 'supervisor2Name' as const, defaultName: 'Supervisor 2' },
  { key: 'supervisor3' as const, nameKey: 'supervisor3Name' as const, defaultName: 'Supervisor 3' }
];

export const useScheduleView = (schedule: DayActivity[], config?: ScheduleConfig) => {
  const chunks = useMemo(() => {
    const chunkSize = 15;
    const result: DayActivity[][] = [];
    
    for (let i = 0; i < schedule.length; i += chunkSize) {
      result.push(schedule.slice(i, i + chunkSize));
    }
    
    return result;
  }, [schedule]);

  const formatActivity = useCallback((activity: ActivityType): string => {
    return activity === '-' ? '-' : activity;
  }, []);

  const getActivityBgClass = useCallback((activity: ActivityType): string => {
    const colorMap: Record<ActivityType, string> = {
      S: 'bg-blue-500',
      I: 'bg-purple-500',
      P: 'bg-emerald-500',
      B: 'bg-orange-500',
      D: 'bg-gray-400',
      '-': 'bg-gray-200'
    };
    return colorMap[activity];
  }, []);

  const getActivityTooltip = useCallback((activity: ActivityType, day: number, supervisorName: string): string => {
    const tooltips: Record<ActivityType, string> = {
      S: `${supervisorName} - Día ${day}: Viaje al campo`,
      I: `${supervisorName} - Día ${day}: Capacitación inicial`,
      P: `${supervisorName} - Día ${day}: Trabajo efectivo de perforación`,
      B: `${supervisorName} - Día ${day}: Retorno del campo`,
      D: `${supervisorName} - Día ${day}: Período de descanso`,
      '-': `${supervisorName} - Día ${day}: Supervisor inactivo`
    };
    return tooltips[activity];
  }, []);

  const getSupervisorName = useCallback((nameKey: 'supervisor1Name' | 'supervisor2Name' | 'supervisor3Name', defaultName: string) => {
    return config?.[nameKey] || defaultName;
  }, [config]);

  return {
    chunks,
    formatActivity,
    getActivityBgClass,
    getActivityTooltip,
    getSupervisorName
  };
};
