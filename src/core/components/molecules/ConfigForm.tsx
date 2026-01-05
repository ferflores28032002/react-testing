import { useFormContext } from 'react-hook-form';
import { Input } from '../atoms/Input';
import type { ConfigFormData } from '../../schemas/configSchema';
import { FormErrorMessage } from '../atoms/FormErrorMessage';

export const ConfigForm = () => {
  const {
    register,
    formState: { errors }
  } = useFormContext<ConfigFormData>();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Input
            type="number"
            label="Días de Trabajo (N)"
            {...register('workDays', { valueAsNumber: true })}
            min={1}
            max={30}
          />
          {errors.workDays && (
            <FormErrorMessage
              message={errors.workDays.message}
            />
          )}
        </div>

        <div>
          <Input
            type="number"
            label="Días Libres Totales (M)"
            {...register('totalRestDays', { valueAsNumber: true })}
            min={2}
            max={20}
          />
          {errors.totalRestDays && (
            <FormErrorMessage
              message={errors.totalRestDays.message}
            />
          )}
        </div>

        <div>
          <Input
            type="number"
            label="Días de Inducción"
            {...register('inductionDays', { valueAsNumber: true })}
            min={1}
            max={5}
          />
          {errors.inductionDays && (
            <FormErrorMessage
              message={errors.inductionDays.message}
            />
          )}
        </div>

        <div>
          <Input
            type="number"
            label="Días de Simulación"
            {...register('simulationDays', { valueAsNumber: true })}
            min={7}
            max={90}
          />
          {errors.simulationDays && (
            <FormErrorMessage
              message={errors.simulationDays.message}
            />
          )}
        </div>
      </div>

      <div>
        <h4 className="text-sm font-semibold text-gray-700 mb-3">Nombres de Supervisores</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Input
              type="text"
              label="Supervisor 1"
              {...register('supervisor1Name')}
              placeholder="Nombre del supervisor 1"
            />
            {errors.supervisor1Name && (
              <FormErrorMessage
                message={errors.supervisor1Name.message}
              />
            )}
          </div>
          <div>
            <Input
              type="text"
              label="Supervisor 2"
              {...register('supervisor2Name')}
              placeholder="Nombre del supervisor 2"
            />
            {errors.supervisor2Name && (
              <FormErrorMessage
                message={errors.supervisor2Name.message}
              />
            )}
          </div>
          <div>
            <Input
              type="text"
              label="Supervisor 3"
              {...register('supervisor3Name')}
              placeholder="Nombre del supervisor 3"
            />
            {errors.supervisor3Name && (
              <FormErrorMessage
                message={errors.supervisor3Name.message}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
