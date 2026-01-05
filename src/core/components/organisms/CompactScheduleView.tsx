import { Card } from '../atoms/Card';
import { Button } from '../atoms/Button';
import { ChunkHeader } from '../molecules/ChunkHeader';
import { DaysGrid } from '../molecules/DaysGrid';
import { SupervisorRow } from '../molecules/SupervisorRow';
import type { DayActivity, ScheduleConfig } from '../../types/schedule.types';
import { useScheduleView, SUPERVISORS } from '../../../features/schedule/hooks/useScheduleView';
import { generateSchedulePdf } from '../../../features/schedule/utils/generatePdf';

interface CompactScheduleViewProps {
  schedule: DayActivity[];
  config?: ScheduleConfig;
}

export const CompactScheduleView = ({ schedule, config }: CompactScheduleViewProps) => {
  const { chunks, formatActivity, getActivityBgClass, getActivityTooltip, getSupervisorName } = useScheduleView(schedule, config);

  return (
    <Card className="p-4 md:p-8 border-0">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 md:mb-6 gap-4">
        <div>
          <h3 className="text-xl md:text-2xl font-bold text-gray-900">Vista Compacta del Cronograma</h3>
          <p className="text-sm md:text-base text-gray-600 mt-1">Visualización horizontal por bloques de 15 días</p>
        </div>
        <Button
          onClick={() => config && generateSchedulePdf(schedule, config)}
          variant="danger"
          className="flex items-center gap-2 shadow-sm"
        >
          Descargar PDF
        </Button>
      </div>

      <div className="space-y-6 md:space-y-8">
        {chunks.map((chunk, chunkIndex) => {
          const days = chunk.map(d => d.day);
          const startDay = days[0];
          const endDay = days[days.length - 1];
          
            <div key={chunkIndex} className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-3 md:p-6">
              <ChunkHeader startDay={startDay} endDay={endDay} />

              <div className="overflow-x-auto overflow-y-visible scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
                <div className="min-w-max space-y-3 md:space-y-4">
                  <DaysGrid days={days} />

                  {SUPERVISORS.map(({ key, nameKey, defaultName }) => (
                    <SupervisorRow
                      key={key}
                      supervisorKey={key}
                      supervisorName={getSupervisorName(nameKey, defaultName)}
                      chunk={chunk}
                      formatActivity={formatActivity}
                      getActivityBgClass={getActivityBgClass}
                      getActivityTooltip={getActivityTooltip}
                    />
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
