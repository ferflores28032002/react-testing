import { useScheduleStore } from '../../../core/store/scheduleStore';

export const useSchedule = () => {
  const { config, schedule, errors, isValid, setConfig, generateSchedule, reset } = useScheduleStore();

  return {
    config,
    schedule,
    errors,
    isValid,
    setConfig,
    generateSchedule,
    reset,
  };
};
