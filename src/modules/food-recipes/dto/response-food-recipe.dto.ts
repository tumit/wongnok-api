import { FoodRecipeEntity } from "../entities/food-recipe.entity"

export interface ResponseFoodRecipeDto {
  id: number
  name: string
  description: string
  ingredient: string
  instruction: string
  cookingDurationId: number
  imageUrl: string
  difficulty: {
    id: number;
    name: string
  }
}

export function toResponseFoodRecipeDto(entity: FoodRecipeEntity): ResponseFoodRecipeDto {
  const { userId, ...response } = {...entity};
  return response;
}