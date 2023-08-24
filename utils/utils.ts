import type { User, UserRoleType } from '../types'

export const roles: { [role in UserRoleType]: Array<UserRoleType> } = {
  ROLE_ADMIN: ['ROLE_ADMIN', 'ROLE_USER'],
  ROLE_USER: ['ROLE_USER'],
}

export function inRange(val: number, minOrMax: number, max?: number) {
  if (max)
    return val > minOrMax && val < max

  return val >= 0 && val < minOrMax
}

export function isGranted(user: User, role: UserRoleType): boolean {
  return roles[user.role].includes(role)
}

export function randomInt(minOrMax: number, max?: number): number {
  return Math.floor(Math.random() * (max ? max - minOrMax : minOrMax) + (max ? minOrMax : 0))
}
