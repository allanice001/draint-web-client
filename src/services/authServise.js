import { Role } from 'constants/role';
import { parseJwt } from './tokenService';

const getPermissions = userType => {
  switch (userType) {
    case 'master':
      return {
        master: true,
        owner: true,
        admin: true,
        user: true,
      };
    case 'owner':
      return {
        master: false,
        owner: true,
        admin: true,
        user: true,
      };
    case 'admin':
      return {
        master: false,
        owner: false,
        admin: true,
        user: true,
      };
    case 'user':
      return {
        master: false,
        owner: false,
        admin: false,
        user: true,
      };
    default:
      return {
        master: false,
        owner: false,
        admin: false,
        user: false,
      };
  }
};

const getUser = () => JSON.parse(localStorage.getItem('user'));

const getUserPermissionsFromToken = () => {
  const user = getUser();
  return user ? parseJwt(user.token) : user;
};

export const checkRouteAccessForUser = (routePermission, role) => {
  const infoFromToken = getUserPermissionsFromToken();

  if (!infoFromToken) {
    return false;
  }

  const permissions = getPermissions(infoFromToken.permission);
  const currentRole = infoFromToken.isArtist ? Role.Artist : Role.Collector;

  const newPermission = infoFromToken?.newPermission;

  if (
    newPermission === 'admin' ||
    newPermission === 'editor' ||
    newPermission === 'analyst'
  ) {
    return 'master';
  }

  if (role && role !== currentRole) {
    return false;
  }

  return permissions[routePermission];
};

export const isUserLoggedIn = () => getUser();
