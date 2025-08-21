// custom-zod-error.ts
import { BadRequestException } from '@nestjs/common';
import { ZodError } from 'zod';

export const customZodError = (error: ZodError) => {
  return new BadRequestException({
    statusCode: 400,
    message: 'Validation failed',
    error: error.issues.map((i) => ({
      name: i.path.join('.'),
      reason: i.message,
      code: i.code,
    })),
  });
};
