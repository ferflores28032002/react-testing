import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import type { DayActivity, ScheduleConfig, ValidationError } from '../types/schedule.types';
import { generateSchedule } from '../../features/schedule/utils/scheduleGenerator';
import { validateSchedule } from '../../features/schedule/utils/scheduleValidator';

interface ScheduleState {
  config: ScheduleConfig;
  schedule: DayActivity[];
  errors: ValidationError[];
  isValid: boolean;
  setConfig: (config: Partial<ScheduleConfig>) => void;
  generateSchedule: () => { success: boolean; errorCount: number };
  reset: () => void;
}

const defaultConfig: ScheduleConfig = {
  workDays: 10,
  totalRestDays: 5,
  inductionDays: 2,
  simulationDays: 15,
  supervisor1Name: 'Supervisor 1',
  supervisor2Name: 'Supervisor 2',
  supervisor3Name: 'Supervisor 3',
};

export const useScheduleStore = create<ScheduleState>()(
  immer((set) => ({
    config: defaultConfig,
    schedule: [],
    errors: [],
    isValid: false,

    setConfig: (newConfig) =>
      set((state) => {
        state.config = { ...state.config, ...newConfig };
      }),

    generateSchedule: () => {
      let result = { success: false, errorCount: 0 };
      set((state) => {
        const schedule = generateSchedule(state.config);
        const { errors, isValid } = validateSchedule(schedule, state.config);
        
        state.schedule = schedule;
        state.errors = errors;
        state.isValid = isValid;
        
        result = { success: isValid, errorCount: errors.length };
      });
      return result;
    },

    reset: () =>
      set((state) => {
        state.config = defaultConfig;
        state.schedule = [];
        state.errors = [];
        state.isValid = false;
      }),
  }))
);
