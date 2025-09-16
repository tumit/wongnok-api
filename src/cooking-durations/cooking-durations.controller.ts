import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CookingDurationsService } from './cooking-durations.service';
import { CreateCookingDurationDto } from './dto/create-cooking-duration.dto';
import { UpdateCookingDurationDto } from './dto/update-cooking-duration.dto';

@Controller('cooking-durations')
export class CookingDurationsController {
  constructor(private readonly cookingDurationsService: CookingDurationsService) {}

  @Post()
  create(@Body() createCookingDurationDto: CreateCookingDurationDto) {
    return this.cookingDurationsService.create(createCookingDurationDto);
  }

  @Get()
  findAll() {
    return this.cookingDurationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cookingDurationsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCookingDurationDto: UpdateCookingDurationDto) {
    return this.cookingDurationsService.update(+id, updateCookingDurationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cookingDurationsService.remove(+id);
  }
}
