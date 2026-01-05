import { ActivityType, SupervisorKey, ValidationErrorType, type DayActivity, type ScheduleConfig, type ValidationError } from '../../../core/types/schedule.types';

export const validateSchedule = (
  schedule: DayActivity[],
  _config: ScheduleConfig
): { errors: ValidationError[]; isValid: boolean } => {
  const errors: ValidationError[] = [];

  let s3Activated = false;

  schedule.forEach((day) => {
    if (day.supervisor3 !== ActivityType.INACTIVE) {
      s3Activated = true;
    }

    if (s3Activated && day.activeDrillers === 1) {
      errors.push({
        day: day.day,
        type: ValidationErrorType.ONLY_ONE_DRILLER,
        message: `Día ${day.day}: Solo 1 supervisor perforando (S3 ya está activo)`,
      });
    }

    if (day.activeDrillers === 3) {
      errors.push({
        day: day.day,
        type: ValidationErrorType.THREE_DRILLERS,
        message: `Día ${day.day}: 3 supervisores perforando simultáneamente`,
      });
    }
  });

  const validateMinimumDrilling = (supervisor: SupervisorKey) => {
    let consecutiveDrilling = 0;
    let cycleStart = -1;

    schedule.forEach((day) => {
      if (day[supervisor] === ActivityType.DRILLING) {
        if (consecutiveDrilling === 0) {
          cycleStart = day.day;
        }
        consecutiveDrilling++;
      } else {
        if (consecutiveDrilling > 0 && consecutiveDrilling < 3) {
          errors.push({
            day: cycleStart,
            type: ValidationErrorType.INSUFFICIENT_DRILLING,
            message: `${supervisor.toUpperCase()}: Solo ${consecutiveDrilling} día(s) de perforación (mínimo 3)`,
          });
        }
        consecutiveDrilling = 0;
      }
    });

    if (consecutiveDrilling > 0 && consecutiveDrilling < 3) {
      errors.push({
        day: cycleStart,
        type: ValidationErrorType.INSUFFICIENT_DRILLING,
        message: `${supervisor.toUpperCase()}: Solo ${consecutiveDrilling} día(s) de perforación (mínimo 3)`,
      });
    }
  };

  validateMinimumDrilling(SupervisorKey.SUPERVISOR_1);
  validateMinimumDrilling(SupervisorKey.SUPERVISOR_2);
  validateMinimumDrilling(SupervisorKey.SUPERVISOR_3);

  return {
    errors,
    isValid: errors.length === 0,
  };
};

