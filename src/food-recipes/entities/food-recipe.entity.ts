// food-recipe.entity.ts
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity({name: 'food_recipe'})
export class FoodRecipe {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string

  @Column()
  description: string

  @Column()
  ingredient: string

  @Column()
  instruction: string

  @Column()
  imageUrl: string

  @Column({name: 'difficulty_id'})
  difficultyId: number

  @Column({name: 'cooking_duration_id'})
  cookingDurationId: number
}
