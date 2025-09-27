
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Login } from "@/interface";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import axiosInstance from './axiosInstance';

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  res.status(200).json({ name: "John Doe" });
}

export async function adminLogin(loginData) {
  try {
    const response = await axios.post("https://codedman.pythonanywhere.com/auth/login/", loginData,{
        headers: {
          'Content-Type': 'application/json',
          accept: "application/json",
        }
      });
    console.log(response.data);
    return response;
  } catch (error) {
    console.log("There was an error!", error);
    throw error;
  }

}

// export async function createPoll(pollData) {
//   try {
//     const response = await axios.post("https://codedman.pythonanywhere.com/api/polls/", pollData, {
//       headers: {
//         'Content-Type': 'application/json',
//         accept: "application/json",
//       }
//     });
//     console.log(response.data);
//     return response;
//   } catch (error) {
//     console.error("There was an error!", error);
//     throw error;
//   }

// }


export async function createPoll( pollData) {
  try {
    const response = await axiosInstance.post("api/polls/", pollData);
    return response;
  }catch (error) {
    console.log("There was an error!", error);
    throw error;
  }
  
}

// Function to add options to a poll
export async function addPollOptions(pollId, options) {
  try {
    const response = await axiosInstance.post(`api/polls/${pollId}/options/`, options);
    return response.data; // This should return the options data
  } catch (error) {
    console.log('Error adding poll options:', error);
    throw error;
  }
}

export async function createUser(userData: Login) {
  try {
      const response = await axios.post("https://codedman.pythonanywhere.com/auth/register/", userData,{
        headers: {
          'Content-Type': 'application/json',
          accept: "application/json",
        }
      });
    return response;
  }catch (error) {
    console.log("There was an error!", error);
    throw error;
  }
}

export async function userLogin(userData: Login){
  try {
      const response = await axios.post("https://codedman.pythonanywhere.com/auth/register/", userData,{
        headers: {
          'Content-Type': 'application/json',
          accept: "application/json",
        }
      });
    return response;
  }catch (error) {
    console.log("There was an error!", error);
    throw error;
  }
}

export async function logoutUser(){
  try {
      const response = await axiosInstance.post("api-auth/logout/");
    return response;
  }catch (error) {
    console.log("There was an error!", error);
    throw error;
  }
}