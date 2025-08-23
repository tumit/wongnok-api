// id-param.dto.ts
import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const idParamSchema = z.object({
  id: z
    .string()
    .regex(/^\d+$/, { message: 'Id must be a number' })
    .transform((val) => Number(val))
    .refine((val) => val > 0, { message: 'Id must be positive' }),
});

export class IdParamDto extends createZodDto(idParamSchema) {}