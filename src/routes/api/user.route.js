import { Router } from 'express';
import * as UserController from '../../controllers/user.controller';

const api = Router();

api.patch('/:id/profile', UserController.updateProfile);
api.delete('/:id', UserController.deleteOne);
api.get('/:id/profile', UserController.getProfile)
api.get('/:id/post', UserController.getPost)
api.get('/', UserController.findAll);

export default api;