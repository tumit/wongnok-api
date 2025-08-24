import { createZodDto } from "nestjs-zod";
import z from "zod";

const ratingDtoSchema = z.object({
  score: z.number().int().positive('score must be a positive number')
})

export class RatingDto extends createZodDto(ratingDtoSchema) {}