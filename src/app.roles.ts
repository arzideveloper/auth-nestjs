import { RolesBuilder } from "nest-access-control"

export enum AppRoles {
  ADMIN = 'ADMIN',
  USER = 'USER',
  GUEST = 'GUEST'
}

export const roles: RolesBuilder = new RolesBuilder();

roles
  .grant(AppRoles.GUEST)
  .readAny('POST')
  .grant(AppRoles.USER)
  .readAny('POST')
  .createOwn('POST')
  .updateOwn('POST')
  .deleteOwn('POST')
  .grant(AppRoles.ADMIN)
  .extend(AppRoles.USER)
  .updateAny('POST')
  .deleteAny('POST')

