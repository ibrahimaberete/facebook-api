import { PrismaClient } from '@prisma/client';
import base64url from 'base64url';

const prisma = new PrismaClient();

export const createOne = async ({ email,
  password }) =>
prisma.user.create({
  data: {
      email,
      password, 
  },
}); 

export const findByCredentials = ({ email, password }, select) => {
  return prisma.user.findFirst({
    where: {
      email,
      password,
    },
    select,
  });
}
export const findById = ({ id }) =>
  prisma.user.findUnique({
    where: { id },
  });

export const findMany = async ({ skip, cursor, limit }) => {
  const users = await prisma.user.findMany({
    skip,
    ...(cursor) ? { cursor }:{},
    take: limit,
  });

  return users.map((user) => ({
    ...user,
    cursor: base64url.encode(JSON.stringify({ id: users.id })),
  }));
}
  
export const getProfile= async(id)=>{
    return prisma.user.findUnique({
        where:{id},
        select:{Profile: true}
    })
}

export const getPost = async (id) => {
    return prisma.user.findUnique({
        where: {id},
        select : {Posts: true},
    })
}
export const createProfile = (userId, firstName, lastName) =>
  prisma.profile.create({
    data: {
      firstName,
      lastName,
      userId : userId,
    }
  });

export const updateProfile = async ({userId, firstName, lastName}) => {
  return prisma.profile.update({
      where : {
          userId,
      }, 
          data : {
          firstName,
          lastName, 
          }, 
          });
}

/*export const deleteOne = async ( request, response) => {
  const {id} = request.params;
   await UserModel.deleteOne(id);

  response.status(204).end();
};*/
  

  export const deleteUser = async(id)=> {
    return prisma.user.delete({
      where:{id},
    });
  }
  


