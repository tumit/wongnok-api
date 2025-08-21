import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FoodRecipesModule } from './food-recipes/food-recipes.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOpts } from './datasource';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        ...dataSourceOpts,
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    FoodRecipesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
