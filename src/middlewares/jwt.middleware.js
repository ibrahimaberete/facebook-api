import { request } from 'express';
import jwt from 'jsonwebtoken';
import { HttpException, HttpStatus } from '../errors/HttpException.error';
import * as UserModel from '../models/user.model';

export const jwtMiddleware = ({ secret }) =>
  async ({ headers: { authorization: token } }, _response, next) => {
    try {
      const { id } = jwt.verify(token, secret);
      const user = await UserModel.findById({id});
      if (!user) {
        return next(new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED));
      }

      request.user = user;

      next();
    } catch(error) {
      console.log(error);
      next(new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED));

    }
  }
