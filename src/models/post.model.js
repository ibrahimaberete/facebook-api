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

export const deleteOne = async (id) => {
  return prisma.post.delete({
    where: { id },
  });
}

export const findOneById = async (id, select) => {
  return prisma.post.findUnique({
    where: { id },
    select
  });
}

export const findAll = async () => {
  return prisma.post.findMany();
}
