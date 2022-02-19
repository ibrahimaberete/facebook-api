import * as UserModel from '../models/user.model';

export const deleteOne = async ( request, response) => {
    const {id} = request.params;
     await UserModel.deleteOne(id);

    response.status(204).end();
}; 

export const findAll = async (_request, response) => {
    response.json({
      posts: await UserModel.findAll(),
    });
  }

  export const findById = async (request, response, next) => {
    const id = Number(request.params.id);
    const user= await UserModel.findById(id)

    response.json({
      user,
    })
  }

  export const getProfile = async(request, response)=>{
      const{id} = request.params;
      const profile = await UserModel.getProfile(id);
      response.json({profile})
  }

  export const getPost = async (request, response) => {
    const {id} = request.params;
    const posts = await UserModel.getPost(id);

    response.json({posts})
}

export const updateProfile  = async (request, response) => {
    const { id } = request.params;
    const { firstName, lastName } = request.body;
    const Profile = await UserModel.updateProfile({
        userId: id,
        firstName,
        lastName, 
    });

    response.json({profile : Profile });
};
  

