export interface Employee {
  _id: string;
  name: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  validationToken: string | null;
  isValidated: boolean;
  isDeleted: boolean;
}
export interface EmployeeList {
  ok: boolean;
  users: Employee[];
}

export interface EmployeeResponse {
  ok: boolean;
  employee: Employee;
}

export interface EmployeeForm {
  id: string;
  name: string;
  lastName: string;
  email: string;
  password: string;
}
