// food-recipe.entity.ts
import { CookingDuration } from "@app/cooking-durations/entities/cooking-duration.entity";
import { Difficulty } from "@app/difficulties/entities/difficulty.entity";
import { User } from "@app/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity({name: 'food_recipe'})
export class FoodRecipe {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string

  @Column()
  description: string

  @Column({ nullable: false })
  ingredient: string

  @Column({ nullable: false })
  instruction: string

  @Column()
  imageUrl: string

  @ManyToOne(() => Difficulty, { nullable: false })
  @JoinColumn({name: 'difficulty_id', referencedColumnName: 'id'})
  difficulty: Difficulty

  @ManyToOne(() => CookingDuration, { nullable: false })
  @JoinColumn({name: 'cooking_duration_id', referencedColumnName: 'id'})
  cookingDuration: CookingDuration

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({name: 'user_id', referencedColumnName: 'id'})
  user: User

}
