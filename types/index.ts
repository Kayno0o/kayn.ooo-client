export type ApiError = {
  code: string;
  error: string;
  status: number;
};

export interface Identifiable {
  created_at?: string;
  deleted_at?: string | null;
  id?: number;
  updated_at?: string;
}

export interface User extends Identifiable {
  email: string;
  role: UserRoleType;
}

export class UserRegisterFormType {
  email: string = '';
  password: string = '';
}

export interface UserRegisterOutput {
  token: string;
}

export type UserRoleType = 'ROLE_USER' | 'ROLE_ADMIN';
