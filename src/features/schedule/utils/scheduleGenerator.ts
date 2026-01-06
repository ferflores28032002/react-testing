import { ActivityType, SupervisorPhase, SupervisorKey, type DayActivity, type ScheduleConfig, type SupervisorState } from '../../../core/types/schedule.types';
import { createSupervisorState } from './supervisorFactory';
import { getActivityFromPhase, countActiveDrillers } from './activityMapper';
import { advanceSupervisor } from './phaseTransitions';
import { applyScheduleAdjustments } from './scheduleAdjuster';

const shouldActivateS3 = (
  s1: SupervisorState,
  s2: SupervisorState,
  s3: SupervisorState
): boolean => {
  if (s3.phase !== SupervisorPhase.WAITING) return false;
  const s1Offline = s1.phase === SupervisorPhase.DESCENDING || s1.phase === SupervisorPhase.RESTING;
  const s2Offline = s2.phase === SupervisorPhase.DESCENDING || s2.phase === SupervisorPhase.RESTING;
  return s1Offline || s2Offline;
};

const buildDayActivity = (
  day: number,
  activities: Record<SupervisorKey, ActivityType>
): DayActivity => ({
  day,
  supervisor1: activities[SupervisorKey.SUPERVISOR_1],
  supervisor2: activities[SupervisorKey.SUPERVISOR_2],
  supervisor3: activities[SupervisorKey.SUPERVISOR_3],
  activeDrillers: countActiveDrillers(Object.values(activities))
});

export const generateSchedule = (config: ScheduleConfig): DayActivity[] => {
  const schedule: DayActivity[] = [];
  
  const supervisors = {
    [SupervisorKey.SUPERVISOR_1]: createSupervisorState(SupervisorPhase.ASCENDING),
    [SupervisorKey.SUPERVISOR_2]: createSupervisorState(SupervisorPhase.ASCENDING),
    [SupervisorKey.SUPERVISOR_3]: createSupervisorState()
  };

  for (let day = 1; day <= config.simulationDays; day++) {

    const activities = {
      [SupervisorKey.SUPERVISOR_1]: getActivityFromPhase(supervisors[SupervisorKey.SUPERVISOR_1]),
      [SupervisorKey.SUPERVISOR_2]: getActivityFromPhase(supervisors[SupervisorKey.SUPERVISOR_2]),
      [SupervisorKey.SUPERVISOR_3]: getActivityFromPhase(supervisors[SupervisorKey.SUPERVISOR_3])
    };

    if (shouldActivateS3(
      supervisors[SupervisorKey.SUPERVISOR_1],
      supervisors[SupervisorKey.SUPERVISOR_2],
      supervisors[SupervisorKey.SUPERVISOR_3]
    )) {
      supervisors[SupervisorKey.SUPERVISOR_3].phase = SupervisorPhase.ASCENDING;
      activities[SupervisorKey.SUPERVISOR_3] = ActivityType.ASCENDING;
    }

    schedule.push(buildDayActivity(day, activities));

    Object.values(supervisors).forEach(supervisor => {
      if (supervisor.phase !== SupervisorPhase.WAITING) {
        advanceSupervisor(supervisor, day, config);
      }
    });
  }

  return applyScheduleAdjustments(schedule);
};
