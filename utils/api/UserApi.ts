import { User, UserRegisterForm, UserRegisterOutput } from '../../types';
import Api from './Api';

export default class UserApi extends Api<User> {
  constructor() {
    super('user');
  }

  async fetchUser(): Promise<User> {
    return this.get('current_user');
  }

  async loginUser(userData: UserRegisterForm): Promise<void> {
    localStorage.removeItem('token');

    return this.customPost<UserRegisterForm, UserRegisterOutput>(userData, '/api/login').then((data) => {
      localStorage.setItem('token', data.token);
    });
  }

  async logoutUser(): Promise<void> {
    localStorage.removeItem('token');
  }

  async registerUser(userData: UserRegisterForm): Promise<void> {
    localStorage.removeItem('token');

    return this.customPost<UserRegisterForm, UserRegisterOutput>(userData, '/api/register').then((data) => {
      localStorage.setItem('token', data.token);
    });
  }
}
