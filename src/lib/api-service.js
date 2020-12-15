import axios from "axios";
// import authService from "./auth-service";

// THIS IS AN EXAMPLE THAT YOU CAN USE
// TO CREATE A SERVICE FOR YOUR AXIOS CALLS
class ApiService {
  constructor() {
    // this.api  is a reusable base of the request containing the base url (baseURL)
    // of the API and the options ( `withCredentials: true` )
    this.api = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
      withCredentials: true,
    });
  }

  getOneUser = (userId) => {
    const pr = this.api.get(`/api/users/${userId}`);
    return pr;
  };

  updateUser = (
    userId,
    username,
    email,
    profileURL,
    description,
    location,
    genre,
    artistType,
    instrument,
    spotifyLink,
    spotifyEmbed
  ) => {
    const pr = this.api.put(`/api/users/${userId}`, {
      username,
      email,
      profileURL,
      description,
      location,
      genre,
      artistType,
      instrument,
      spotifyLink,
      spotifyEmbed,
    });

    return pr;
  };

  createProject = ( 
    title,
    type,
    lookingFor,
    location,
    fee,
    coverURL,
    description
  ) => {
   
        const pr = this.api.post(`/api/projects`, {
          title,
          type,
          lookingFor,
          location,
          fee,
          coverURL,
          description
        })
        
        return pr
      
  };

  getOneProject = (projectId)=>{
    const pr=this.api.get(`/api/projects/${projectId}`)
    return pr
  }

  updateProject=(projectId,title, type, lookingFor, location, fee, coverURL, description,status)=>{
    const pr=this.api.put(`/api/projects/${projectId}`,{title, type, lookingFor, location, fee, coverURL, description,status})
    return pr
  }

  deleteProject=(projectId)=>{
    const pr = this.api.delete(`/api/projects/${projectId}`)
    return pr

  }

  getAllOfOneUser=(userId)=>{
    const pr = this.api.get(`/api/users/${userId}`)
    return pr
  }

  acceptRequest=(projectId,userId)=>{
    const pr =this.api.get(`/api/projects/acceptation/${projectId}/${userId}`)
    return pr
  }

  rejectRequest=(projectId,userId)=>{
    const pr =this.api.get(`/api/projects/rejection/${projectId}/${userId}`)
    return pr
  }

  getAllUsers=()=>{
    const pr=this.api.get(`/api/users`)
    return pr
  }

  likeOneUser=(userId)=>{
    const pr=this.api.get(`/api/users/like/${userId}`)
    return pr
  }

  disLikeOneUser=(userId)=>{
    const pr = this.api.get(`/api/users/dislike/${userId}`)
    return pr
  }

  sendRequest=(projectId,userId)=>{
    const pr = this.api.get(`/api/projects/request/${projectId}/${userId}`)
    return pr
  }

  cancelRequest=(projectId,userId)=>{
    const pr = this.api.get(`/api/projects/cancel-request/${projectId}/${userId}`)
    return pr
  }

  getAllProjects=()=>{
    const pr = this.api.get(`/api/projects`)
    return pr
  }
  
  openOneProject=(projectId)=>{
    const pr = this.api.get(`/api/projects/open/${projectId}`);
    return pr
  }

  closeOneProject=(projectId)=>{
    const pr = this.api.get(`/api/projects/close/${projectId}`);
    return pr
  }
  // create = (data) => {
  //   const pr = this.api.post(`/example/${id}`, data )

  //   return pr;
  // }

  deleteOne = (id) => {
    const pr = this.api.delete(`/example/${id}`);

    return pr;
  };

}

// Create instance (object) containing all axios calls as methods
const apiService = new ApiService();

export default apiService;

// Service is a set of methods abstracted and placed into a class, out of which we create one instance.
// In the above case, all axios request calls are abstracted into methods.
