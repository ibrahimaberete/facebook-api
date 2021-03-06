import { ErrorNotFound } from "../errors/NotFound.error";
import { ErrorBadRequest } from '../errors/BadRequest.error';
import * as PostModel from '../models/post.model';

export const CreatePostDto = async ({ body, user }, response) => {
  const { message } = body;
  if (!message) return new ErrorBadRequest();
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

export const paginateKeyset = async (request, response) => {
  const { API_URL = 'http://localhost:8081/api' } = process.env;

  const { cursor = '' } = request.query;
  const limit = parseInt(request.query.limit || '5');
  const posts = await PostModel.findMany({
    skip: (cursor === '') ? 0 : 1,
    cursor: (cursor === '') ? null: JSON.parse(base64url.decode(cursor)),
    limit,
  });

  const nextCursor = posts[posts.length - 1].cursor;
  const next = `${API_URL}/v1/posts?cursor=${nextCursor}&limit=${Math.abs(limit)}`;
  const previous = `${API_URL}/v1/posts?cursor=${cursor}&limit=${-limit}`;

  response
    .status(200)
    .json({
      data: { posts },
      links: {
        next,
        previous,
      },
    });
}

export const UpdatePostDto = async (request, response) => {
  const { id } = request.params;
  const { message } = request.body;
  if (!message) return next(new ErrorNotFound());

  const post = await PostModel.updateOne({
    id:Number(id),
   message,
  });

  
  response
  .status(200)
  .json({ post });
}

export const deleteOne = async (request, response) => {
  const id = Number(request.params.id); 
  await PostModel.deleteOne(id);
  response.status(204).end();
}


