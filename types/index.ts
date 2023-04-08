export interface User {
  created_at: string;
  deleted_at: string | null;
  email: string;
  id: number;
  updated_at: string;
}

export class UserRegisterForm {
  email: string = '';
  password: string = '';
}

export interface UserRegisterOutput {
  token: string;
}
