// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Login } from "@/interface";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

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
    console.error("There was an error!", error);
    throw error;
  }

}
