import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column({ name: 'difficulty_id' })
  difficultyId: number;
}
