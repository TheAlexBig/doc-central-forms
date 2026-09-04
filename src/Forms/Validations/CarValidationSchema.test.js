import { describe, expect, it } from 'vitest';
import * as Yup from 'yup';
import { CarValidationSchema } from './CarValidationSchema';

const classSchema = Yup.object().shape({ clase: CarValidationSchema.clase });
const tractionSchema = Yup.object().shape({
  clase: CarValidationSchema.clase,
  traccion: CarValidationSchema.traccion,
});

describe('vehicle class validation', () => {
  it.each(['Automóvil', 'Camión liviano', 'Camión pesado', 'Motocicleta'])(
    'accepts the supported class %s',
    async (vehicleClass) => {
      await expect(
        classSchema.validate({ clase: vehicleClass })
      ).resolves.toEqual({ clase: vehicleClass });
    }
  );

  it('rejects a class that is not available in the selector', async () => {
    await expect(classSchema.validate({ clase: 'Autobús' })).rejects.toThrow(
      'Seleccione una clase admitida'
    );
  });

  it('requires traction for a heavy truck', async () => {
    await expect(
      tractionSchema.validate({ clase: 'Camión pesado', traccion: '' })
    ).rejects.toThrow('Campo requerido');
  });

  it('keeps traction optional for an automobile', async () => {
    await expect(
      tractionSchema.validate({ clase: 'Automóvil', traccion: '' })
    ).resolves.toEqual({ clase: 'Automóvil', traccion: '' });
  });
});
