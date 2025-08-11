export class CreateFoodRecipeDto  {
  name: string
  description: string
  ingredient: string
  instruction: string
  difficultyId: number
  cookingDurationId: number
  imageUrl: string

}
export class CreateFoodRecipeDtoResponse {
  id: number;
}