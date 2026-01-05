import * as yup from 'yup';

export const configSchema = yup.object({
  workDays: yup
    .number()
    .typeError('Debe ser un número')
    .required('Los días de trabajo son obligatorios')
    .min(1, 'Debe haber al menos 1 día de trabajo')
    .max(30, 'No puede haber más de 30 días de trabajo')
    .integer('Debe ser un número entero'),
  
  totalRestDays: yup
    .number()
    .typeError('Debe ser un número')
    .required('Los días de descanso son obligatorios')
    .min(2, 'Debe haber al menos 2 días de descanso')
    .max(20, 'No puede haber más de 20 días de descanso')
    .integer('Debe ser un número entero'),
  
  inductionDays: yup
    .number()
    .typeError('Debe ser un número')
    .required('Los días de inducción son obligatorios')
    .min(1, 'Debe haber al menos 1 día de inducción')
    .max(5, 'No puede haber más de 5 días de inducción')
    .integer('Debe ser un número entero'),
  
  simulationDays: yup
    .number()
    .typeError('Debe ser un número')
    .required('Los días de simulación son obligatorios')
    .min(7, 'Debe haber al menos 7 días de simulación')
    .max(90, 'No puede haber más de 90 días de simulación')
    .integer('Debe ser un número entero'),
  
  supervisor1Name: yup
    .string()
    .required('El nombre del supervisor 1 es obligatorio')
    .min(2, 'El nombre debe tener al menos 2 caracteres'),
  
  supervisor2Name: yup
    .string()
    .required('El nombre del supervisor 2 es obligatorio')
    .min(2, 'El nombre debe tener al menos 2 caracteres'),
  
  supervisor3Name: yup
    .string()
    .required('El nombre del supervisor 3 es obligatorio')
    .min(2, 'El nombre debe tener al menos 2 caracteres')
}).required();

export type ConfigFormData = yup.InferType<typeof configSchema>;
