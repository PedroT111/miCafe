export interface User {
  id: string;
  name: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  validationToken: string | null;
  isValidated: boolean;
  isDeleted: boolean;
}

export interface UserAuth{
    email: string;
    password: string;
}

export interface RegistrationRes{
  ok: boolean;
  newUser: User;
}

export interface LoginRes{
  ok: boolean;
  token: string;
  user: User;
}
