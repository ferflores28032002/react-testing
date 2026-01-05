export enum ActivityType {
  ASCENDING = 'S',
  INDUCTION = 'I',
  DRILLING = 'P',
  DESCENDING = 'B',
  RESTING = 'D',
  INACTIVE = '-'
}

export enum SupervisorPhase {
  WAITING = 'waiting',
  ASCENDING = 'ascending',
  INDUCTION = 'induction',
  DRILLING = 'drilling',
  DESCENDING = 'descending',
  RESTING = 'resting'
}

export enum SupervisorKey {
  SUPERVISOR_1 = 'supervisor1',
  SUPERVISOR_2 = 'supervisor2',
  SUPERVISOR_3 = 'supervisor3'
}

export enum ValidationErrorType {
  ONLY_ONE_DRILLER = 'only_one_driller',
  THREE_DRILLERS = 'three_drillers',
  INSUFFICIENT_DRILLING = 'insufficient_drilling'
}

export interface DayActivity {
  day: number;
  supervisor1: ActivityType;
  supervisor2: ActivityType;
  supervisor3: ActivityType;
  activeDrillers: number;
}

export interface ScheduleConfig {
  workDays: number;
  totalRestDays: number;
  inductionDays: number;
  simulationDays: number;
  supervisor1Name?: string;
  supervisor2Name?: string;
  supervisor3Name?: string;
}

export interface SupervisorState {
  currentDay: number;
  phase: SupervisorPhase;
  daysInPhase: number;
  cycleNumber: number;
  totalDrillingDays: number;
}

export interface ValidationError {
  day: number;
  type: ValidationErrorType;
  message: string;
}
