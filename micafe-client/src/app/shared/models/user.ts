export interface User {
  _id: string;
  name: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  points: number;
  validationToken: string | null;
  registrationDate: Date;
  lastOrderDate: Date;
  isValidated: boolean;
  isDeleted: boolean;
}

export interface UserSummary{
  _id: string;
  name: string;
  lastName: string;
  email: string;
  registrationDate: string;
  lastOrderDate: string;
  isValidated: string;
}

export interface UserOrderList{
  ok: boolean;
  users: UserSummary[];
}

export interface UserAuth{
    email: string;
    password: string;
}

export interface UserApi{
  ok: boolean;
  user: User
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

