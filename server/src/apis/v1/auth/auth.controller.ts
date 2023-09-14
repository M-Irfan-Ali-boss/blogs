import {
  BadRequestException,
  Body,
  Controller,
  HttpStatus,
  NotFoundException,
  Post,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from './schemas/user.schema';
import { CreateUser, LoginUserDto } from './dto/auth.dto';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from '@constants/contants';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private jwtService: JwtService,
  ) {}

  //Register User Route
  @Post('register')
  async createUser(
    @Body() userData: CreateUser,
    @Res() res: Response,
  ): Promise<User | any> {
    //Check if user already exists
    const userExist = await this.authService.getUserByEmail(userData.email);
    if (userExist)
      throw new BadRequestException('User already exists againts this email');

    //Convert User Password in hasing
    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash(userData.password, salt);

    //Create User Account
    const user = await this.authService.createUser({ ...userData, password });
    if (!user) throw new BadRequestException('Something went wrong');

    //Generating the user token for authorization
    const payload = { sub: user._id, email: user.email };
    const token = await this.jwtService.signAsync(payload, {
      secret: jwtConstants.secret,
    });
    if (!token) throw new UnauthorizedException();

    //Remove password from user info
    delete user._doc.password;

    return res.status(HttpStatus.CREATED).send({ user, token });
  }

  //Login User Route
  @Post('login')
  async loginUser(
    @Body() userData: LoginUserDto,
    @Res() res: Response,
  ): Promise<User | any> {
    //Check if user already exists
    const user = await this.authService.getUserByEmail(userData.email);
    if (!user) throw new NotFoundException('Account not found');

    //Compate User Password
    const isMatch = await bcrypt.compare(userData.password, user.password);
    if (!isMatch) throw new BadRequestException('Credientials not valid');

    //Generating the user token for authorization
    const payload = { sub: user._id, email: user.email };
    const token = await this.jwtService.signAsync(payload, {
      secret: jwtConstants.secret,
    });
    if (!token) throw new UnauthorizedException();

    //Remove password from user info
    delete user._doc.password;

    return res.status(HttpStatus.OK).send({ user, token });
  }
}
