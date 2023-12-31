import { axiosInstance } from ".";
export const AddMovie = async (payload) => {
    try {
      console.log(payload);
      const response = await axiosInstance.post('/api/movies/add-movie', payload);
      // console.log(response);
      return response.data;
    } catch (err) {
      return err;
    }
  }
  export const UpdateMovie = async (payload) => {
    try {
    // console.log(payload);
      const response = await axiosInstance.put('/api/movies/update-movie',payload);
      // console.log(response);
      return response.data;
    } catch (err) {
      return err;
    }
  }
  export const GetAllMovies = async () => {
    try {
    
      const response = await axiosInstance.get('/api/movies/get-all-movies');
      // console.log(response);
      return response.data;
    } catch (err) {
      return err;
    }
  }

  export const DeleteMovie = async (movieId) => {
    try {
      const response = await axiosInstance.delete(`/api/movies/delete-movie?movieId=${movieId}`);
      return response.data;
    } catch (err) {
      return err;
    }
  }
  export const GetMovieById = async (movieId) => {
    try {
      // console.log(movieId);
      const response = await axiosInstance.get(`/api/movies/get-movie-by-id/${movieId}`);
      return response.data;
    } catch (err) {
      return err.response;
    }
  };