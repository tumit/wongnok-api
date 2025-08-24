//user.entity.ts
import { Rating } from '@app/food-recipes/entities/rating.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
    nullable: false,
  })
  username: string;

  @Column({
    nullable: false,
  })
  password: string;

  @Column({
    nullable: false,
    default: Role.USER,
  })
  role: Role;

  @OneToMany(() => Rating, (rating) => rating.foodRecipe)
  ratings: Rating[];
}
