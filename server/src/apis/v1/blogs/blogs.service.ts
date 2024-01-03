import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Blog } from './schemas/blog.schema';
import { InjectModel } from '@nestjs/mongoose';
import { AddBlogDto, UpdateBlogDto } from './dto/blog.dto';
import { BlogStats } from './interface/interface';

@Injectable()
export class BlogsService {
  constructor(@InjectModel(Blog.name) private blogModel: Model<Blog>) {}

  //Get All Blogs Function
  getAllBlogs(): Promise<Blog[]> {
    return this.blogModel.find().populate('category').exec();
  }

  //Get All Blogs Function
  async getBlogsStats(user: string): Promise<BlogStats> {
    const blogs = await this.blogModel.find({ user }).exec();

    const total = blogs.length;
    const active = blogs.filter((blog) => blog.status === 'active').length;
    const inactive = blogs.filter((blog) => blog.status === 'inactive').length;
    const draft = blogs.filter((blog) => blog.status === 'draft').length;

    return { total, active, inactive, draft };
  }

  //Get All Blogs By User Function
  getBlogsByUser(user: string): Promise<Blog[]> {
    return this.blogModel.find({ user }).populate('category').exec();
  }

  //Get Single Blog By Id Function
  getBlogById(blogId: string): Promise<Blog> {
    return this.blogModel.findOne({ _id: blogId }).populate('category').exec();
  }

  //Get User Single Blog By Id Function
  getUserBlogById(user: string, blogId: string): Promise<Blog> {
    return this.blogModel.findOne({ _id: blogId, user }).exec();
  }

  //Create New Blog Function
  createBlog(blog: AddBlogDto): Promise<Blog> {
    return this.blogModel.create(blog);
  }

  //Update New Blog Function
  updateBlog(blog: UpdateBlogDto, picture: any): Promise<Blog> {
    return this.blogModel.findByIdAndUpdate(
      blog.blodId,
      {
        title: blog.title,
        description: blog.description,
        category: blog.category,
        status: blog.status,
        picture,
      },
      { new: true },
    );
  }

  //Delete Blog Function
  deleteUserBlogById(user: string, blogId: string): Promise<any> {
    return this.blogModel.deleteOne({ _id: blogId, user });
  }
}
