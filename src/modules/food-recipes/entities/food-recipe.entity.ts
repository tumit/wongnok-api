import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Difficulty } from '../../difficulties/entities/difficulty.entity';

@Entity('food_recipes')
export class FoodRecipeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  ingredient: string;

  @Column()
  instruction: string;

  @Column({ name: 'image_url' })
  imageUrl: string;

  @Column({ name: 'cooking_duration_id' })
  cookingDurationId: number;

  @Column({ name: 'user_id' })
  userId: number;

  // @Column({ name: 'difficulty_id' })
  // difficultyId: number;
  @ManyToOne(() => Difficulty)
  @JoinColumn({ referencedColumnName: 'id' })
  difficulty: Difficulty;
}
