import { Injectable } from '@nestjs/common';
import { Category } from './schemas/category.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}

  //Get All Categories Function
  async getAllCategories(): Promise<Category[]> {
    return this.categoryModel.find().exec();
  }

  //Get Sing Category By Id Function
  async getCategoryById(categoryId: string): Promise<Category> {
    return this.categoryModel.findOne({ _id: categoryId }).exec();
  }

  //Create Category Function
  async createCategory(name: string): Promise<Category> {
    return this.categoryModel.create({ name });
  }

  //Update Categories Function
  async updateCategory(categoryId: string, name: string): Promise<Category> {
    return this.categoryModel.findByIdAndUpdate(
      categoryId,
      { name },
      { new: true },
    );
  }

  //Delete Category Function
  async deleteCategoryById(categoryId: string): Promise<any> {
    return this.categoryModel.findByIdAndDelete({ _id: categoryId }).exec();
  }
}
