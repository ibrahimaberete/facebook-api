import { Router } from 'express';
import * as AuthenticationController from '../../controllers/authentication.controller';

const api = Router();

api.post('/login', AuthenticationController.LoginDto);
api.post('/register', AuthenticationController.RegisterDto);

export default api;