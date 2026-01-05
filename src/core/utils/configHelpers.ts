import type { ConfigFormData } from '../schemas/configSchema';
import type { ScheduleConfig } from '../types/schedule.types';

export const normalizeConfig = (config: ScheduleConfig): ConfigFormData => ({
  ...config,
  supervisor1Name: config.supervisor1Name ?? '',
  supervisor2Name: config.supervisor2Name ?? '',
  supervisor3Name: config.supervisor3Name ?? '',
});
