import { Injectable } from '@nestjs/common';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUser } from './dto/auth.dto';
import { ObjectId } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  //Get User By Email Function
  getUserByEmail(email: string): Promise<(User & { _id: ObjectId }) | any> {
    return this.userModel.findOne({ email }).exec();
  }

  //Get User By Id Function
  getUserById(userId: string): Promise<User> {
    return this.userModel.findOne({ _id: userId }).exec();
  }

  //Create New User Function
  createUser(user: CreateUser): Promise<(User & { _id: ObjectId }) | any> {
    return this.userModel.create(user);
  }
}
