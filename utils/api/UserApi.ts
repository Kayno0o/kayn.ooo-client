import { User, UserRegisterForm, UserRegisterOutput } from '../../types';
import Api from './Api';

export default class UserApi extends Api<User> {
  constructor() {
    super('user');
  }

  async fetchUser(forceFetch: boolean = true): Promise<User | null> {
    if (!localStorage.getItem('token')) {
      return null;
    }

    if (!forceFetch && sessionStorage.getItem('user')) {
      return JSON.parse(sessionStorage.getItem('user') as string);
    }

    return this.get('current_user')
      .then((user) => {
        sessionStorage.setItem('user', JSON.stringify(user));
        return user;
      })
      .catch(() => {
        sessionStorage.removeItem('user');
        return null;
      });
  }

  async loginUser(userData: UserRegisterForm): Promise<void> {
    localStorage.removeItem('token');
    sessionStorage.removeItem('user');

    return this.customPost<UserRegisterForm, UserRegisterOutput>(userData, 'login').then((data) => {
      localStorage.setItem('token', data.token);
    });
  }

  async logoutUser(): Promise<void> {
    localStorage.removeItem('token');
    sessionStorage.removeItem('user');
  }

  async registerUser(userData: UserRegisterForm): Promise<void> {
    localStorage.removeItem('token');
    sessionStorage.removeItem('user');

    return this.customPost<UserRegisterForm, UserRegisterOutput>(userData, 'register').then((data) => {
      localStorage.setItem('token', data.token);
    });
  }
}
