import { ActivityType, SupervisorPhase, SupervisorKey, type DayActivity, type ScheduleConfig, type SupervisorState } from '../../../core/types/schedule.types';
import { createSupervisorState } from './supervisorFactory';
import { getActivityFromPhase, countActiveDrillers } from './activityMapper';
import { advanceSupervisor } from './phaseTransitions';
import { applyScheduleAdjustments } from './scheduleAdjuster';

const shouldActivateS3 = (s3: SupervisorState, activeDrillers: number): boolean => {
  return s3.phase === SupervisorPhase.WAITING && activeDrillers === 1;
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
    [SupervisorKey.SUPERVISOR_2]: createSupervisorState(),
    [SupervisorKey.SUPERVISOR_3]: createSupervisorState()
  };

  for (let day = 1; day <= config.simulationDays; day++) {
    if (day === 2) {
      supervisors[SupervisorKey.SUPERVISOR_2].phase = SupervisorPhase.ASCENDING;
    }

    const activities = {
      [SupervisorKey.SUPERVISOR_1]: getActivityFromPhase(supervisors[SupervisorKey.SUPERVISOR_1]),
      [SupervisorKey.SUPERVISOR_2]: getActivityFromPhase(supervisors[SupervisorKey.SUPERVISOR_2]),
      [SupervisorKey.SUPERVISOR_3]: getActivityFromPhase(supervisors[SupervisorKey.SUPERVISOR_3])
    };

    const activeDrillers = countActiveDrillers(Object.values(activities));

    if (shouldActivateS3(supervisors[SupervisorKey.SUPERVISOR_3], activeDrillers)) {
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
