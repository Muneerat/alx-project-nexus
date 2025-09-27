import axiosInstance from "./axiosInstance";

export async function viewPolls() {
    try{
        const response = await axiosInstance.get("/api/polls");
        return response
    }catch(error){
        throw error
    }
}

export async function voteOnPoll(pollId: string, optionId: string) {
    try{
        const response = await axiosInstance.post(`/api/polls/${pollId}/vote/`, {option_id: optionId });
        return response
    }catch(error){
        throw error
    }
}

export async function viewPoll(pollId: string) {
    try{
        const response = await axiosInstance.get(`/api/polls/${pollId}`);
        return response
    }catch(error){
        throw error
    }
}

export async function getResult(pollId: string){
    try{
        const response = await axiosInstance.get(`/api/polls/${pollId}/results`);
        return response
    }catch(error){
        throw error
    }
}
    