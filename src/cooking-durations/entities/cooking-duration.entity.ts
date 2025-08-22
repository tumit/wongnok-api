// cooking-duration.entity.ts
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('cooking_durations')
export class CookingDuration {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;
}
