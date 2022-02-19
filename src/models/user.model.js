import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const deleteOne = async (userId) =>{
prisma.profile.delete({
    where: { 
        userId
    },
}); 
}

export const findByCredentials = ({ email, password }) =>
  prisma.User.findUnique({
    where: {
      email,
      
    },
  });

export const findById = ({ id }) =>
  prisma.user.findUnique({
    where: { id },
  });

export const createOne = async ({ email,
    password }) =>
  prisma.user.create({
    data: {
        email,
        password, 
    },
  });
  export const findAll = () => prisma.user.findMany();
  
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


