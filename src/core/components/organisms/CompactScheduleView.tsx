import { Card } from '../atoms/Card';
import { Button } from '../atoms/Button';
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
          
          return (
            <div key={chunkIndex} className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-3 md:p-6">
              <div className="flex items-center justify-between mb-3 md:mb-4">
                <h4 className="text-xs md:text-sm font-bold text-gray-700 uppercase tracking-wider">
                  Días {startDay} - {endDay}
                </h4>
              </div>

              <div className="overflow-x-auto overflow-y-visible scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
                <div className="min-w-max space-y-3 md:space-y-4">
                  <div className="grid gap-2 md:gap-4 items-center" style={{ gridTemplateColumns: '150px repeat(15, 1fr)' }}>
                    <div className="bg-white px-2 md:px-3 py-1.5 md:py-2 rounded-lg border border-gray-200">
                      <span className="text-xs md:text-sm font-bold text-gray-900">Día</span>
                    </div>
                    {days.map(day => (
                      <div key={day} className="bg-white px-2 md:px-3 py-1.5 md:py-2 rounded text-center border border-gray-200">
                        <span className="text-[10px] md:text-xs font-semibold text-gray-700">{day}</span>
                      </div>
                    ))}
                  </div>

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
