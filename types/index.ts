export interface User {
  created_at: string;
  deleted_at: string | null;
  email: string;
  id: number;
  role: UserRoleType;
  updated_at: string;
}

export class UserRegisterForm {
  email: string = '';
  password: string = '';
}

export interface UserRegisterOutput {
  token: string;
}

export type UserRoleType = 'ROLE_USER' | 'ROLE_ADMIN';
