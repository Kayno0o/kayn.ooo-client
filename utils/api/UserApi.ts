import { User, UserRegisterFormType, UserRegisterOutput } from '../../types';
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

    return this.find('current_user')
      .then((user) => {
        sessionStorage.setItem('user', JSON.stringify(user));
        return user;
      })
      .catch(() => {
        sessionStorage.removeItem('user');
        return null;
      });
  }

  async loginUser(userData: UserRegisterFormType): Promise<void> {
    localStorage.removeItem('token');
    sessionStorage.removeItem('user');

    return this.customPost<UserRegisterFormType, UserRegisterOutput>(userData, 'login').then((data) => {
      localStorage.setItem('token', data.token);
    });
  }

  async logoutUser(): Promise<void> {
    localStorage.removeItem('token');
    sessionStorage.removeItem('user');
  }

  async registerUser(userData: UserRegisterFormType): Promise<void> {
    localStorage.removeItem('token');
    sessionStorage.removeItem('user');

    return this.customPost<UserRegisterFormType, UserRegisterOutput>(userData, 'register').then((data) => {
      localStorage.setItem('token', data.token);
    });
  }
}
