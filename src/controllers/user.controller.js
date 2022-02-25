import * as UserModel from '../models/user.model';


  export const paginateKeyset = async (request, response) => {
    const { API_URL = 'http://localhost:8081/api' } = process.env;
  
    const { cursor = '' } = request.query;
    const limit = parseInt(request.query.limit || '5');
  
    const users = await UserModel.findMany({
      skip: (cursor === '') ? 0 : 1,
      cursor: (cursor === '') ? null: JSON.parse(base64url.decode(cursor)),
      limit,
    });
  
    const nextCursor = users[users.length - 1].cursor;
  
    const next = `${API_URL}/v1/users?cursor=${nextCursor}&limit=${Math.abs(limit)}`;
    const previous = `${API_URL}/v1/users?cursor=${cursor}&limit=${-limit}`;
  
    response
      .status(200)
      .json({
        data: { users },
        links: {
          next,
          previous,
        },
      });
  }
  
  export const findById = async (request, response, next) => {
    const id = Number(request.params.id);
    const user= await UserModel.findById(id)

    response
    .status(200)
    .json({
      user,
    })
  }

  export const getProfile = async(request, response)=>{
      const{id} = request.params;
      const profile = await UserModel.getProfile(id);
      response
      .status(200)
      .json({profile})
  }

  export const getPost = async (request, response) => {
    const {id} = request.params;
    const posts = await UserModel.getPost(id);

    response
    .status(200)
    .json({posts})
}

export const updateProfile  = async (request, response) => {
  const { id } = request.params;
  const { firstName, lastName } = request.body;
  const Profile = await UserModel.updateProfile({
      userId: id,
      firstName,
      lastName, 
  });

  response
  .status(200)
  .json({profile : Profile });
};

export const deleteUser = async (request, response) => {
  const {id} = (request.params);
  
  await UserModel.deleteUser(id);

  response.status(204).end();
}
  

