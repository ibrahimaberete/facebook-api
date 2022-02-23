import * as PostModel from '../models/post.model';
import { ErrorNotFound } from "../errors/NotFound.error";


export const createOne = async ({ body, user }, response) => {
  const { message } = body;
  const post = await PostModel.createOne({
    message,
    authorId: user.id,
  });

  response
    .status(201)
    .json({ data: { post } });
}
export const findOneById = async (request, response, next) => {
  const id = Number(request.params.id);
  const post= await PostModel.findOneById(id)
  if (!post) return next(new ErrorNotFound());

  

  response
  .status(200)
  .json({
    post,
  })
}

export const findAll = async (_request, response) => {
  response
  .status(200)
  .json({
    posts: await PostModel.findAll(),
  });
}

export const updateOne = async (request, response) => {
  const { id } = request.params;
  const { message } = request.body;

  const post = await PostModel.updateOne({
    id:Number(id),
   message,
  });

  if (!post) return next(new ErrorNotFound());


  response
  .status(200)
  .json({ post });
}

export const deleteOne = async (request, response) => {
  const id = Number(request.params.id);
  
  await PostModel.deleteOne(id);

  response.status(204).end();
}


