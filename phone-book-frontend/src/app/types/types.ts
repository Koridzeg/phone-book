export interface User {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoggingUser {
  username: string;
  password: string;
  token: string;
}

export interface IContact {
  _id?:string;
  name: string;
  surname:string;
  phone:string;
}