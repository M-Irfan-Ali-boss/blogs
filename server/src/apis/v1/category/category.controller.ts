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

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  //Get All Categories Route
  @Get('all')
  async getAllCategories(): Promise<Category[]> {
    return this.categoryService.getAllCategories();
  }

  //Get Single Category Route
  @Get(':categoryId')
  async getCategoryById(
    @Param('categoryId') categoryId: string,
  ): Promise<Category> {
    return this.categoryService.getCategoryById(categoryId);
  }

  //Create New Category Route
  @Post()
  async addCategory(
    @Body('name') name: string,
    @Res() res: Response,
  ): Promise<Category | any> {
    const category = await this.categoryService.createCategory(name);
    if (!category)
      return res
        .status(HttpStatus.NOT_FOUND)
        .send({ message: 'Category not found.' });
    res.status(HttpStatus.OK).send({ message: 'Category has been updated.' });
  }

  //Updatee Category Route
  @Put(':categoryId')
  async updateCategory(
    @Param('categoryId') categoryId: string,
    @Body('name') name: string,
    @Res() res: Response,
  ): Promise<Category | any> {
    const category = await this.categoryService.updateCategory(
      categoryId,
      name,
    );
    if (!category)
      return res
        .status(HttpStatus.NOT_FOUND)
        .send({ message: 'Category not found.' });
    res.status(HttpStatus.OK).send({ message: 'Category has been updated.' });
  }

  //Delete Category Route
  @Delete(':categoryId')
  async deleteCategory(
    @Param('categoryId') categoryId: string,
    @Res() res: Response,
  ): Promise<any> {
    const deleted = await this.categoryService.deleteCategoryById(categoryId);
    if (!deleted)
      return res
        .status(HttpStatus.NOT_FOUND)
        .send({ message: 'Category not found.' });
    res.status(HttpStatus.OK).send({ message: 'Category has been deleted.' });
  }
}
