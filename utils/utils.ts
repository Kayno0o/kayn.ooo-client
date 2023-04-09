import { User, UserRoleType } from '../types';

export const isGranted = (user: User, role: UserRoleType): boolean => {
  return roles[user.role].includes(role);
};

export const randomInt = (minOrMax: number, max?: number): number => {
  return Math.floor(Math.random() * (max ? max - minOrMax : minOrMax) + (max ? minOrMax : 0));
};

export const roles: { [role in UserRoleType]: Array<UserRoleType> } = {
  ROLE_ADMIN: ['ROLE_ADMIN', 'ROLE_USER'],
  ROLE_USER: ['ROLE_USER'],
};
