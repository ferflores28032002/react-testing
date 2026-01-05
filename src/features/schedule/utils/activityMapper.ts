import { ActivityType, SupervisorPhase, type SupervisorState } from '../../../core/types/schedule.types';

export const PHASE_TO_ACTIVITY_MAP: Record<SupervisorPhase, ActivityType> = {
  [SupervisorPhase.WAITING]: ActivityType.INACTIVE,
  [SupervisorPhase.ASCENDING]: ActivityType.ASCENDING,
  [SupervisorPhase.INDUCTION]: ActivityType.INDUCTION,
  [SupervisorPhase.DRILLING]: ActivityType.DRILLING,
  [SupervisorPhase.DESCENDING]: ActivityType.DESCENDING,
  [SupervisorPhase.RESTING]: ActivityType.RESTING
};

export const getActivityFromPhase = (supervisor: SupervisorState): ActivityType => {
  return PHASE_TO_ACTIVITY_MAP[supervisor.phase];
};

export const countActiveDrillers = (activities: ActivityType[]): number => {
  return activities.filter(activity => activity === ActivityType.DRILLING).length;
};
