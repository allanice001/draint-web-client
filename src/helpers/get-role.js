import { ARTISTS } from 'constants/routes/masterModule/artists';
import { BLOG } from 'constants/routes/masterModule/dashboard';
import { MASTER_ROOT } from 'constants/routes/masterModule/dashboard';
import { permissions } from 'constants/permissions';

const checkAccess = (urls, path) => {
  return !!urls && urls.some(({ url }) => url === path);
};

export const roles = ({ permission, new_permission, urls }) => {
  return {
    isSuperAdmin: permission === permissions.MASTER,
    canEditArtistArtwork:
      (!!urls && urls.find(({ url }) => url === `${MASTER_ROOT}${ARTISTS}`)) ||
      false,
    canEditArtistBlog: checkAccess(urls, `${MASTER_ROOT}${BLOG}`),
    isSubAdmin: new_permission !== permissions.EDITOR_OLD,
    isEditor: new_permission === permissions.EDITOR,
    isAdmin: new_permission === permissions.ADMIN,
    isOwner: new_permission === permissions.EDITOR_OLD,
    isEditorOrAdmin:
      new_permission === permissions.EDITOR ||
      new_permission === permissions.ADMIN ||
      permission === permissions.MASTER,
    isAnyAdmins:
      new_permission === permissions.EDITOR ||
      new_permission === permissions.ADMIN ||
      new_permission === permissions.ANALYST ||
      permission === permissions.MASTER,
    isAnalyst: new_permission === permissions.ANALYST,
  };
};
