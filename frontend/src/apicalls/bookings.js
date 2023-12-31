import { axiosInstance } from ".";

export const  MakePayment=async (token,amount)=>{
    try{
        console.log("here")
        const response=await axiosInstance.post('/api/bookings/make-payment',{
            token,amount
        });
        return response.data;

    }catch(err){
        return err.message;

    }


}
export const BookShowTickets = async (payload) => {
    try {
        console.log(payload);
      const response = await axiosInstance.post(
        "/api/bookings/book-show",
        payload
      );
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  };

  export const GetBookingsOfUser = async () => {
    try {
      const response = await axiosInstance.get(
        "/api/bookings/get-bookings"
      );
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }; 