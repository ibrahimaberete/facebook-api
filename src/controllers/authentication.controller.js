import jwt from 'jsonwebtoken';
import * as UserModel from '../models/user.model';
import { HttpStatus,HttpException } from '../errors/HttpException.error';
import { ErrorBadRequest } from "../errors/BadRequest.error";


export const login = async (request, response) => {
  const { email, password } = request.body;
  if (email == undefined || password == undefined) {
    throw new ErrorBadRequest();
  }

  const user = await UserModel.findByCredentials({ email, password }, { id: true, email: true });
  if (!user) {
    throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
  }
  const token = jwt.sign({ id: user.id }, 'SECRET');

  response.json({ token, user });
}

export const register = async (request, response) => {
  const { email, password } = request.body;
  if (!email || !password) throw new ErrorBadRequest();
  const user = await UserModel.createOne({ email, password });
  await UserModel.createProfile(user.id, "", "");

  response.status(201).json({ user });
}
