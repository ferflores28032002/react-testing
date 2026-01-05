import { FormProvider } from 'react-hook-form';
import { Card } from '../atoms/Card';
import { ConfigForm } from '../molecules/ConfigForm';
import { Button } from '../atoms/Button';
import { SectionHeader } from '../atoms/SectionHeader';
import { InfoSummaryCard } from '../atoms/InfoSummaryCard';
import { useConfigForm } from '../../hooks/useConfigForm';
import type { ScheduleConfig } from '../../types/schedule.types';
import type { ConfigFormData } from '../../schemas/configSchema';

interface ConfigPanelProps {
  config: ScheduleConfig;
  onConfigChange: (config: ConfigFormData) => void;
  onGenerate: () => void;
  onReset: () => void;
  hasSchedule: boolean;
}

export const ConfigPanel = ({ 
  config, 
  onConfigChange, 
  onGenerate, 
  onReset,
  hasSchedule
}: ConfigPanelProps) => {
  const { methods, isValid, handleFormSubmit, summary } = useConfigForm({
    config,
    onConfigChange,
    onGenerate
  });

  return (
    <Card className="p-8">
      <FormProvider {...methods}>
        <form onSubmit={handleFormSubmit} className="space-y-6">
          <SectionHeader
            title="Configuración del Cronograma"
            description="Define los parámetros del régimen de trabajo para los supervisores"
          />

          <ConfigForm />

          <InfoSummaryCard
            title={`Régimen ${summary.workDays}x${summary.totalRestDays}`}
            items={[
              { label: "Días de trabajo", value: `${summary.workDays} días` },
              { label: "Días de descanso real", value: `${summary.realRestDays} días` },
              {
                label: "Días de inducción",
                value: `${summary.inductionDays} días (solo primer ciclo)`,
              },
            ]}
          />

          <div className="flex gap-3 justify-end">
            <Button 
              type="submit"
              variant="primary"
              size="md"
              disabled={!isValid}
            >
              Generar Cronograma
            </Button>
            {hasSchedule && (
              <Button 
                type="button" 
                onClick={onReset}
                variant="secondary"
                size="md"
              >
                Resetear
              </Button>
            )}
          </div>
        </form>
      </FormProvider>
    </Card>
  );
};
