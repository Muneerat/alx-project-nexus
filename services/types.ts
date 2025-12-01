
export type userData =  {
    first_name: string,
    surname: string
    email: string,
    confirm_email?: string,
    password: string,
    confirm_password: string,
}

export type loginData = {
    email: string,
    password: string
    access?: string;
    refresh?: string | number | undefined
}
export type userProfile = {
    email: string,
    first_name: string,
    surname: string,
    role: string
}

export type PollTypeResult = {
    results: PollType[];
      count?: string | number 
}

export type PollType = {
  id: string;
  title: string;
  description: string;
  created_by: string;
  expires_at: string;
  options: { id: string | number; text: string }[]; 
  has_voted?: boolean; 
  count?: string
}

export type VotePayload = {
  pollId: string; 
  option_id:  string; 
}
// type PollType = {
//   id: string;
//   title: string;
//   description: string;
//   created_by: string;
//   expires_at: string;
//   //@typescript-eslint/no-explicit-any
// // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   options: any[]; 
// }