import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('cooking_duration')
export class CookingDuration {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
