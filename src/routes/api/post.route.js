import * as PostModel from '../../controllers/post.controller';
import { Router } from 'express';

const api = Router();

api.post('/', PostModel.CreatePostDto);
api.get('/', PostModel.paginateKeyset);
api.get('/:id', PostModel.findOneById);
api.patch('/:id', PostModel.UpdatePostDto);
api.delete('/:id', PostModel.deleteOne);

export default api;