export interface Person {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  message: string;
  data: Person;
}
