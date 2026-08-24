import { describe, expect, it } from 'vitest';
import * as Yup from 'yup';
import { CarValidationSchema } from './CarValidationSchema';

const classSchema = Yup.object().shape({ clase: CarValidationSchema.clase });

describe('vehicle class validation', () => {
  it.each(['Automóvil', 'Camión liviano', 'Camión pesado'])(
    'accepts the supported class %s',
    async (vehicleClass) => {
      await expect(
        classSchema.validate({ clase: vehicleClass })
      ).resolves.toEqual({ clase: vehicleClass });
    }
  );

  it('rejects a class that is not available in the selector', async () => {
    await expect(
      classSchema.validate({ clase: 'Motocicleta' })
    ).rejects.toThrow('Seleccione una clase admitida');
  });
});
