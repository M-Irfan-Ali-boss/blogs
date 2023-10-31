import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  Put,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import * as cloudinary from 'cloudinary';
import { BlogsService } from './blogs.service';
import { Blog } from './schemas/blog.schema';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateBlogDto, UpdateBlogDto } from './dto/blog.dto';
import { FileUploadPipe } from './pipe/file-upload.pipe';
import { Response } from 'express';
import { AuthGuard } from '../auth/guard/auth.guard';
import { RequestWithUser } from '@constants/contants';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Blogs')
@Controller('blog')
export class BlogsController {
  constructor(
    private readonly blogService: BlogsService,
    private readonly fileUploadPipe: FileUploadPipe,
  ) {}

  //Get All Blogs Route
  @Get('all')
  @ApiOperation({ summary: 'Get All Blogs' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: Blog,
  })
  async getAllBlogs(): Promise<Blog[]> {
    return this.blogService.getAllBlogs();
  }

  //Get All Blogs By User Route
  @UseGuards(AuthGuard)
  @Get('user')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get All User Blogs' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: Blog,
  })
  async getAllBlogsByUser(@Req() req: RequestWithUser): Promise<Blog[]> {
    const user = req.user;
    return this.blogService.getBlogsByUser(user.sub);
  }

  //Get Single Blog Route
  @Get(':blogId')
  async getBlogById(@Param('blogId') blogId: string): Promise<Blog> {
    return this.blogService.getBlogById(blogId);
  }

  //Create Blog Route
  @UseGuards(AuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async createBlog(
    @Body() blogBody: CreateBlogDto,
    @Req() req: RequestWithUser,
    @Res() res: Response,
  ) {
    const user = req.user;
    const { url, publicId } = await this.fileUploadPipe.transform(req);
    const blog = await this.blogService.createBlog({
      title: blogBody.title,
      description: blogBody.description,
      status: blogBody.status,
      user: user.sub,
      category: blogBody.category,
      picture: { url, publicId },
    });
    if (!blog) throw new InternalServerErrorException('Something  went wrong');

    res.status(HttpStatus.CREATED).send(blog);
  }

  //Update Blog Route
  @UseGuards(AuthGuard)
  @Put()
  @UseInterceptors(FileInterceptor('file'))
  async updateBlog(
    @Body() blogBody: UpdateBlogDto,
    @UploadedFile() file: Express.Multer.File,
    @Req() req: RequestWithUser,
    @Res() res: Response,
  ) {
    if (file) {
      const { url, publicId } = await this.fileUploadPipe.transform(req);
      blogBody['picture'] = { url, publicId };
    }

    const updatedBlog = await this.blogService.updateBlog(blogBody);
    if (!updatedBlog)
      throw new InternalServerErrorException('Something  went wrong');

    res.status(HttpStatus.OK).send(updatedBlog);
  }

  //Delete Blog Route
  @UseGuards(AuthGuard)
  @Delete(':blogId')
  async deleteBlogById(
    @Param('blogId') blogId: string,
    @Res() res: Response,
    @Req() req: RequestWithUser,
  ): Promise<any> {
    const user = req.user;
    const blog = await this.blogService.getUserBlogById(user.sub, blogId);
    if (!blog) throw new NotFoundException('Blog not found');

    const result = await cloudinary.v2.uploader.destroy(blog.picture.publicId);
    if (result.result !== 'ok')
      throw new InternalServerErrorException('Something  went wrong');

    const deleted = await this.blogService.deleteUserBlogById(user.sub, blogId);
    if (deleted.deletedCount !== 1)
      throw new InternalServerErrorException('Something  went wrong');

    res.status(HttpStatus.OK).send({ message: 'Blog has been deleted.' });
  }
}
