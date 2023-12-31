import { axiosInstance } from ".";

export const AddTheater = async (payload) => {
  try {
    // console.log(payload);
    const response = await axiosInstance.post(
      "/api/theaters/add-theater",
      payload
    );
    return response.data;
  } catch (err) {
    return err;
  }
};
export const UpdateTheater = async (payload) => {
  try {
    // console.log(payload);
    const response = await axiosInstance.put(
      "/api/theaters/update-theater",
      payload
    );
    // console.log(response);
    return response.data;
  } catch (err) {
    return err;
  }
};
export const GetAllTheaters = async () => {
  try {
    const response = await axiosInstance.get("/api/theaters/get-all-theaters");
    console.log("in axios ", response);
    return response.data;
  } catch (err) {
    return err;
  }
};

export const DeleteTheater = async (theaterId) => {
  try {
    const response = await axiosInstance.delete(
      `/api/theaters/delete-theater?theaterId=${theaterId}`
    );
    return response.data;
  } catch (err) {
    return err;
  }
};

export const GetAllTheatersByOwner = async (ownerId) => {
  try {
    const response = await axiosInstance.get(
      `/api/theaters/get-all-theaters-by-owner?owner=${ownerId}`
    );
    return response.data;
  } catch (err) {
    return err;
  }
};

export const AddShow = async (payload) => {
  try {
    console.log(payload);
    const response = await axiosInstance.post(
      "/api/theaters/add-show",
      payload
    );
    return response.data;
  } catch (err) {
    return err;
  }
};

export const GetAllShowsByTheatre = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/theaters/get-all-shows-by-theatre",
      payload
    );
    return response.data;
  } catch (err) {
    return err;
  }
};

export const DeleteShow = async (showId) => {
  try {
    const response = await axiosInstance.delete(
      `/api/theaters/delete-show?showId=${showId}`
    );
    return response.data;
  } catch (err) {
    return err;
  }
};

export const GetAllTheatresByMovie = async (payload) => {
  try {

    const response = await axiosInstance.post(
      "/api/theaters/get-all-theaters-by-movie",
      payload
    );
    return response.data;
  } catch (err) {
    return err.response;
  }
};
export const GetShowById = async (payload) => {
  try {

    const response = await axiosInstance.post(
      "/api/theaters/get-show-by-id",
      payload
    );
    return response.data;
  } catch (err) {
    return err.response;
  }
};