import { SupervisorPhase, type SupervisorState, type ScheduleConfig } from '../../../core/types/schedule.types';

type PhaseTransitionHandler = (supervisor: SupervisorState, config: ScheduleConfig) => boolean;

const transitionFromWaiting: PhaseTransitionHandler = () => false;

const transitionFromAscending: PhaseTransitionHandler = (supervisor) => {
  if (supervisor.daysInPhase < 1) return false;
  
  supervisor.phase = supervisor.cycleNumber === 0 
    ? SupervisorPhase.INDUCTION 
    : SupervisorPhase.DRILLING;
  supervisor.daysInPhase = 0;
  return true;
};

const transitionFromInduction: PhaseTransitionHandler = (supervisor, config) => {
  if (supervisor.daysInPhase < config.inductionDays) return false;
  
  supervisor.phase = SupervisorPhase.DRILLING;
  supervisor.daysInPhase = 0;
  return true;
};

const transitionFromDrilling: PhaseTransitionHandler = (supervisor, config) => {
  const daysBeforeDrilling = supervisor.cycleNumber === 0 
    ? 1 + config.inductionDays 
    : 1;
  const requiredDrillingDays = config.workDays - daysBeforeDrilling;
  
  if (supervisor.daysInPhase < requiredDrillingDays) return false;
  
  supervisor.phase = SupervisorPhase.DESCENDING;
  supervisor.totalDrillingDays += requiredDrillingDays;
  supervisor.daysInPhase = 0;
  return true;
};

const transitionFromDescending: PhaseTransitionHandler = (supervisor) => {
  if (supervisor.daysInPhase < 1) return false;
  
  supervisor.phase = SupervisorPhase.RESTING;
  supervisor.daysInPhase = 0;
  return true;
};

const transitionFromResting: PhaseTransitionHandler = (supervisor, config) => {
  const realRestDays = config.totalRestDays - 2;
  if (supervisor.daysInPhase < realRestDays) return false;
  
  supervisor.phase = SupervisorPhase.ASCENDING;
  supervisor.daysInPhase = 0;
  supervisor.cycleNumber++;
  return true;
};

export const phaseTransitions: Record<SupervisorPhase, PhaseTransitionHandler> = {
  [SupervisorPhase.WAITING]: transitionFromWaiting,
  [SupervisorPhase.ASCENDING]: transitionFromAscending,
  [SupervisorPhase.INDUCTION]: transitionFromInduction,
  [SupervisorPhase.DRILLING]: transitionFromDrilling,
  [SupervisorPhase.DESCENDING]: transitionFromDescending,
  [SupervisorPhase.RESTING]: transitionFromResting
};

export const advanceSupervisor = (supervisor: SupervisorState, day: number, config: ScheduleConfig): void => {
  supervisor.daysInPhase++;
  supervisor.currentDay = day;
  
  const transitionHandler = phaseTransitions[supervisor.phase];
  transitionHandler(supervisor, config);
};
