import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo } from 'react';
import { configSchema, type ConfigFormData } from '../schemas/configSchema';
import type { ScheduleConfig } from '../types/schedule.types';
import { normalizeConfig } from '../utils/configHelpers';

interface UseConfigFormProps {
  config: ScheduleConfig;
  onConfigChange: (config: ConfigFormData) => void;
  onGenerate: () => void;
}

export const useConfigForm = ({ config, onConfigChange, onGenerate }: UseConfigFormProps) => {
  const normalizedValues = useMemo(() => normalizeConfig(config), [config]);

  const methods = useForm<ConfigFormData>({
    resolver: yupResolver(configSchema),
    mode: 'onChange',
    values: normalizedValues
  });

  const { handleSubmit, watch, formState: { isValid } } = methods;
  const values = watch();

  const summary = useMemo(() => {
    const safeValue = (val: number | undefined, fallback: number) => {
      if (val === undefined || val === null || Number.isNaN(val)) return fallback;
      return val;
    };

    const workDays = safeValue(values.workDays, config.workDays);
    const totalRestDays = safeValue(values.totalRestDays, config.totalRestDays);
    const inductionDays = safeValue(values.inductionDays, config.inductionDays);
    const realRestDays = totalRestDays - 2;

    return {
      workDays,
      totalRestDays,
      realRestDays,
      inductionDays
    };
  }, [values.workDays, values.totalRestDays, values.inductionDays, config.workDays, config.totalRestDays, config.inductionDays]);

  const handleFormSubmit = handleSubmit((data) => {
    onConfigChange(data);
    onGenerate();
  });

  return {
    methods,
    isValid,
    handleFormSubmit,
    summary
  };
};
