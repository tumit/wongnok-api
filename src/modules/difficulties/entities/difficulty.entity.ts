import { Exclude } from "class-transformer";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('difficulties')
export class Difficulty {

  @Exclude()
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}