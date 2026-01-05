import { SupervisorPhase, type SupervisorState } from '../../../core/types/schedule.types';

export const TOTAL_SIMULATION_DAYS = 15;

export const createSupervisorState = (phase: SupervisorPhase = SupervisorPhase.WAITING): SupervisorState => ({
  currentDay: 0,
  phase,
  daysInPhase: 0,
  cycleNumber: 0,
  totalDrillingDays: 0
});
