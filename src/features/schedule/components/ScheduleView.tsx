import { toast } from 'sonner';
import { useSchedule } from '../hooks/useSchedule';
import { ConfigPanel } from '../../../core/components/organisms/ConfigPanel';
import { CompactScheduleView } from '../../../core/components/organisms/CompactScheduleView';
import { Legend } from '../../../core/components/organisms/Legend';
import { ErrorList } from '../../../core/components/molecules/ErrorList';
import { EmptyStateCard } from './EmptyStateCard';
import { SectionHeader } from './SectionHeader';

export const ScheduleView = () => {
  const { config, schedule, errors, setConfig, generateSchedule, reset } = useSchedule();

  const handleGenerate = () => {
    const { success, errorCount } = generateSchedule();

    if (success) {
      toast.success('Cronograma generado exitosamente', {
        description: 'El cronograma cumple con todas las reglas de negocio'
      });
    } else {
      toast.error('Errores de validación encontrados', {
        description: `Se encontraron ${errorCount} errores en el cronograma`
      });
    }
  };

  const handleReset = () => {
    reset();
    toast.info('Configuración reseteada', {
      description: 'Se han restaurado los valores por defecto'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        <SectionHeader
          title="Algoritmo de Cronograma de Supervisores"
          subtitle="Sistema inteligente para la planificación automática de turnos de supervisores de perforación minera"
        />


        <div className="space-y-6 mb-6">
          <ConfigPanel
            config={config}
            onConfigChange={setConfig}
            onGenerate={handleGenerate}
            onReset={handleReset}
            hasSchedule={schedule.length > 0}
          />

          <Legend />
        </div>

        {schedule.length > 0 && (
          <div className="space-y-6">
            {errors.length > 0 && <ErrorList errors={errors} />}
            <CompactScheduleView schedule={schedule} config={config} />
          </div>
        )}

        {schedule.length === 0 && (
          <EmptyStateCard
            title="No hay cronograma generado"
            description='Configura los parámetros del régimen y haz clic en "Generar Cronograma" para comenzar'
          />
        )}
      </div>
    </div>
  );
};
