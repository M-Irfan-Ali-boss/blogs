import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../auth/schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  //User Profile Update Function
  updateUser(userData: { userId: string; name: string }): Promise<User> {
    return this.userModel.findByIdAndUpdate(
      userData.userId,
      {
        name: userData.name,
      },
      { new: true },
    );
  }

  //User Password Update Function
  updateUserPassword(userData: {
    userId: string;
    password: string;
  }): Promise<User> {
    return this.userModel.findByIdAndUpdate(
      userData.userId,
      {
        password: userData.password,
      },
      { new: true },
    );
  }

  //User Profile Delete Function
  deletUser(userId: string): Promise<any> {
    return this.userModel.deleteOne({ _id: userId });
  }
}
