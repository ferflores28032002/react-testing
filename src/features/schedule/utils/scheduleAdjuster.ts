import { ActivityType, SupervisorKey, type DayActivity } from '../../../core/types/schedule.types';
import { countActiveDrillers } from './activityMapper';

export const applyScheduleAdjustments = (schedule: DayActivity[]): DayActivity[] => {
  const adjusted = [...schedule];
  
  for (let i = 0; i < adjusted.length; i++) {
    if (needsAdjustment(adjusted[i])) {
      adjustS2Schedule(adjusted, i);
    }
  }
  
  return adjusted;
};

const needsAdjustment = (day: DayActivity): boolean => {
  return day.activeDrillers === 1 && day.supervisor3 !== ActivityType.INACTIVE;
};

const adjustS2Schedule = (schedule: DayActivity[], currentIndex: number): void => {
  const lastS2DrillingIndex = findLastDrillingDay(schedule, currentIndex, SupervisorKey.SUPERVISOR_2);
  
  if (lastS2DrillingIndex === -1) return;
  
  const daysToExtend = currentIndex - lastS2DrillingIndex;
  if (daysToExtend <= 0 || daysToExtend > 3) return;
  
  extendDrillingPeriod(schedule, lastS2DrillingIndex, currentIndex);
  recalculateActiveDrillers(schedule);
};

const findLastDrillingDay = (
  schedule: DayActivity[],
  currentIndex: number,
  supervisor: SupervisorKey
): number => {
  for (let i = currentIndex - 1; i >= 0; i--) {
    if (schedule[i][supervisor] === ActivityType.DRILLING) {
      return i;
    }
  }
  return -1;
};

const extendDrillingPeriod = (
  schedule: DayActivity[],
  startIndex: number,
  endIndex: number
): void => {
  for (let i = startIndex; i < endIndex; i++) {
    const currentActivity = schedule[i].supervisor2;
    if (currentActivity === ActivityType.DESCENDING || currentActivity === ActivityType.RESTING) {
      schedule[i].supervisor2 = ActivityType.DRILLING;
    }
  }
};

const recalculateActiveDrillers = (schedule: DayActivity[]): void => {
  schedule.forEach(day => {
    const activities = [day.supervisor1, day.supervisor2, day.supervisor3];
    day.activeDrillers = countActiveDrillers(activities);
  });
};
