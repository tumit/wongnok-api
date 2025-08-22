// difficulty.entity.ts
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('difficulties')
export class Difficulty {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;
}
