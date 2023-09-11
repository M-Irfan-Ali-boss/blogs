import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
  Patch,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserService } from './user.service';
import { Response } from 'express';
import { User } from '../auth/schemas/user.schema';
import { AuthGuard } from '../auth/guard/auth.guard';
import { RequestWithUser } from '@constants/contants';
import { AuthService } from '../auth/auth.service';
import { UpdateUserPasswordDto } from './dto/auth.dto';

@UseGuards(AuthGuard)
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  //Get User Profile By Token Route
  @Get('profile')
  async getUserProfile(
    @Res() res: Response,
    @Req() req: RequestWithUser,
  ): Promise<User | any> {
    const { sub } = req.user;
    //Get User Info
    const user = await this.authService.getUserById(sub);
    if (!user) throw new NotFoundException('Account not found');

    res.status(HttpStatus.OK).send(user);
  }

  //Update User Profile Info Route
  @Patch('profile')
  async updateUserProfile(
    @Body('name') name: string,
    @Res() res: Response,
    @Req() req: RequestWithUser,
  ): Promise<User | any> {
    const { sub } = req.user;
    //Get User Info
    const user = await this.authService.getUserById(sub);
    if (!user) throw new NotFoundException('Account not found');

    //Update User Profile
    const updatedUser = await this.userService.updateUser({
      userId: sub,
      name,
    });
    if (!updatedUser)
      throw new InternalServerErrorException('Something  went wrong');

    res.status(HttpStatus.OK).send(updatedUser);
  }

  //Update User Password Route
  @Post('profile/change-password')
  async updateUserPassword(
    @Body() userData: UpdateUserPasswordDto,
    @Res() res: Response,
    @Req() req: RequestWithUser,
  ): Promise<User | any> {
    const { sub } = req.user;
    //Get User Info
    const user = await this.authService.getUserById(sub);
    if (!user) throw new NotFoundException('Account not found');

    //Compate User Password
    const isMatch = await bcrypt.compare(userData?.oldPassword, user.password);
    if (!isMatch)
      throw new BadRequestException(
        'Old password must need to  match with previous password',
      );

    //Convert User Password in hasing
    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash(userData.password, salt);

    //Update User Password
    const updatedUser = await this.userService.updateUserPassword({
      userId: sub,
      password,
    });
    if (!updatedUser)
      throw new InternalServerErrorException('Something  went wrong');

    res.status(HttpStatus.OK).send(updatedUser);
  }
}
