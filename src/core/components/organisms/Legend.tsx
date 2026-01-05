import { Card } from '../atoms/Card';
import { getActivityLabel, getActivityColor } from '../../../features/schedule/helpers/activityHelpers';
import { ActivityType } from '../../types/schedule.types';

const activities = [
  { 
    type: ActivityType.ASCENDING, 
    name: 'Ascenso',
    description: 'Viaje al campo'
  },
  { 
    type: ActivityType.INDUCTION, 
    name: 'Inducción',
    description: 'Capacitación inicial'
  },
  { 
    type: ActivityType.DRILLING, 
    name: 'Perforación',
    description: 'Trabajo efectivo'
  },
  { 
    type: ActivityType.DESCENDING, 
    name: 'Descenso',
    description: 'Retorno del campo'
  },
  { 
    type: ActivityType.RESTING, 
    name: 'Descanso',
    description: 'Período de descanso'
  },
  { 
    type: ActivityType.INACTIVE, 
    name: 'Inactivo',
    description: 'Supervisor inactivo'
  }
];

export const Legend = () => {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Leyenda de Actividades</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {activities.map(({ type, name, description }) => (
          <div key={type} className="flex items-center gap-2">
            <span className={`inline-flex items-center justify-center px-2 py-1 rounded text-xs font-bold text-white ${getActivityColor(type)}`}>
              {name}
            </span>
            <div>
              <p className="text-xs font-semibold text-gray-900">{getActivityLabel(type)}</p>
              <p className="text-[10px] text-gray-500">{description}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
