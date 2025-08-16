export class CreateFoodRecipeDto  {
  name: string
  description: string
  ingredient: string
  instruction: string
  difficulty: { id: number }
  cookingDurationId: number
  imageUrl: string
}
export class CreateFoodRecipeDtoResponse {
  id: number;
}