import base64url from 'base64url';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createOne = async ({ message, authorId }) => {
  return await prisma.post.create({
    data: {
      message,
      Author:{
        connect:{
          id: authorId
        }
      }
      
    },
  });
}

export const updateOne = async ({ id, message }) => {
  return await  prisma.post.update({
    where: {
      id,
    },
    data: {
      message,
      
    },
  });
}

export const findOneById = async (id, select) => {
  return prisma.post.findUnique({
    where: { id },
    select
  });
}

export const findMany = async ({ skip, cursor, limit }) => {
  const posts = await prisma.post.findMany({
    skip,
    ...(cursor) ? { cursor }:{},
    take: limit,
  });

  return posts.map((post) => ({
    ...post,
    cursor: base64url.encode(JSON.stringify({ id: post.id })),
  }));
}

export const deleteOne = async (id) => {
  return prisma.post.delete({
    where: { id },
  });
}
