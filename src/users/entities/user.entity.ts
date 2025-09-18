import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN'
}

@Entity('users')
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true
  })
  username: string;

  @Column()  
  password: string;

  @Column()
  role: Role
}
