import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { FoodRecipeEntity } from '@root/src/modules/food-recipes/entities/food-recipe.entity';

export class FoodRecipeSeeder implements Seeder {
  public async run(
    _dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const foodRecipeFactory = factoryManager.get(FoodRecipeEntity);
    await foodRecipeFactory.saveMany(10);
  }
}
