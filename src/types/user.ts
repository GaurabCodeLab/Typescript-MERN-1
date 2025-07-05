export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  gender: string;
  hobbies: string[];
  book: string;
}

export interface UserResponse {
  message: string;
  data: User[];
}
