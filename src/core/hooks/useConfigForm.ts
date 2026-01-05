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
    const workDays = values.workDays ?? config.workDays;
    const totalRestDays = values.totalRestDays ?? config.totalRestDays;
    const inductionDays = values.inductionDays ?? config.inductionDays;
    const realRestDays = (totalRestDays || 0) - 2;

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
