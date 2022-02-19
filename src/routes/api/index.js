import { Router } from 'express';
import authentication from './authentication.route';
import post from './post.route';
import user from './user.route';

/** Middlewares */
import {jwtMiddleware} from '../../middlewares/jwt.middleware';

const api = Router();

api.use("/v1/authentication", authentication);
api.use("/v1/users", jwtMiddleware({'secret':"SECRET"}),user );
api.use("v1//posts",jwtMiddleware({'secret':"SECRET"}),post);


export default api;
