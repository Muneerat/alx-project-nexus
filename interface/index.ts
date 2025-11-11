import React from "react";

export type FormInputProps = {
  placeholder: string;
  label: string;
  value?: string;
  type?: string;
  error: any;
}& React.InputHTMLAttributes<HTMLInputElement>;

export type  FormInputPassProps = {
  placeholder: string;
  label: string;
  value?: string;
  error: string;
}& React.InputHTMLAttributes<HTMLInputElement>;


 export interface PollsProps  {
  id : string;
  title: string;
  description: string;
  created_by: string;
  expires_at: string;
  options: Options[]

}
export interface Options {
 id: string;
 text: string;
}
 export interface Login{
  email: string;
  password: string
 }

 export interface BoxCardProps{
  // id: string;
  text: string;
  number: string
 }