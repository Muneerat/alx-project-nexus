import axiosInstance from "./axiosInstance";

export async function viewPolls() {
    try{
        const response = await axiosInstance.get("/api/polls");
        return response
    }catch(error){
        throw error
    }
}
    