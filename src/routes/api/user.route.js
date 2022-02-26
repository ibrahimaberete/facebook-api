import { Router } from 'express';
import * as UserController from '../../controllers/user.controller';

const api = Router();

api.patch('/:id/profile', UserController.updateProfile);
api.get('/:id/profile', UserController.getProfile)
api.get('/:id/posts', UserController.getPost)
api.get('/', UserController.paginateKeyset);
api.delete('/:id', UserController.deleteUser)
export default api;