import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { Category } from './schemas/category.schema';
import { CategoryService } from './category.service';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CategoryEntity, CategoryPostEntity } from './entities/category.entity';
import { CategoryDto } from './dto/category.dto';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  //Get All Categories Route
  @Get('all')
  @ApiResponse({ status: HttpStatus.OK, type: [CategoryEntity] })
  async getAllCategories(@Res() res: Response) {
    const categories = await this.categoryService.getAllCategories();
    res.status(HttpStatus.OK).send(categories);
  }

  //Get Single Category Route
  @Get(':categoryId')
  @ApiResponse({ status: HttpStatus.OK, type: CategoryEntity })
  async getCategoryById(
    @Param('categoryId') categoryId: string,
    @Res() res: Response,
  ): Promise<Category | any> {
    const category = await this.categoryService.getCategoryById(categoryId);
    if (!category)
      return res
        .status(HttpStatus.NOT_FOUND)
        .send({ message: 'Category not found.' });
    res.status(HttpStatus.OK).send(category);
  }

  //Create New Category Route
  @Post()
  @ApiBody({ type: CategoryPostEntity })
  @ApiResponse({ status: HttpStatus.CREATED, type: CategoryEntity })
  async addCategory(
    @Body() categoryData: CategoryDto,
    @Res() res: Response,
  ): Promise<Category | any> {
    const category = await this.categoryService.createCategory(
      categoryData.name,
    );
    if (!category)
      return res
        .status(HttpStatus.SERVICE_UNAVAILABLE)
        .send({ message: 'Someting went wrong please try again.' });
    res.status(HttpStatus.OK).send({ category });
  }

  //Update Category Route
  @Put(':categoryId')
  @ApiBody({ type: CategoryPostEntity })
  @ApiResponse({ status: HttpStatus.OK, type: CategoryEntity })
  async updateCategory(
    @Param('categoryId') categoryId: string,
    @Body() categoryData: CategoryDto,
    @Res() res: Response,
  ): Promise<Category | any> {
    const category = await this.categoryService.updateCategory(
      categoryId,
      categoryData.name,
    );
    if (!category)
      return res
        .status(HttpStatus.NOT_FOUND)
        .send({ message: 'Category not found.' });
    res.status(HttpStatus.OK).send({ message: category });
  }

  //Delete Category Route
  @Delete(':categoryId')
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    type: 'string',
  })
  async deleteCategory(
    @Param('categoryId') categoryId: string,
    @Res() res: Response,
  ): Promise<any> {
    const deleted = await this.categoryService.deleteCategoryById(categoryId);
    if (!deleted)
      return res
        .status(HttpStatus.NOT_FOUND)
        .send({ message: 'Category not found.' });
    res
      .status(HttpStatus.NO_CONTENT)
      .send({ message: 'Category has been deleted.' });
  }
}
