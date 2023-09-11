import { Request } from 'express';

export const jwtConstants = {
  secret: process.env.JWT_SECRET,
};

export interface RequestWithUser extends Request {
  user: {
    sub: string;
    email: string;
    iat: number;
    exp: number;
  };
}
