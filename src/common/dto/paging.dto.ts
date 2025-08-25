import { createZodDto } from 'nestjs-zod';
import z from 'zod';

const pagingDtoSchema = z.object({
  limit: z
    .string()
    .regex(/^\d+$/, { message: 'Id must be a number' })
    .default('5')
    .transform((val) => Number(val))
    .refine((val) => val > 0, { message: 'page must be positive' }),
  page: z
    .string()
    .regex(/^\d+$/, { message: 'Id must be a number' })
    .default('1')
    .transform((val) => Number(val))
    .refine((val) => val > 0, { message: 'limit must be positive' }),
});

export class PagingDto extends createZodDto(pagingDtoSchema) {}
