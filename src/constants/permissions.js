export const Types = {
  Blog: 'blog',
  ContactToolTemplate: 'contact_tool_template',
  ContactToolEmail: 'contact_tool_email',
  Atelier: 'artist-atelier',
};

export const plans = {
  all_in_one_trial: 'All-In-One Trial',
  basic_trial: 'Basic Trial',
  all_in_one: 'All-In-One',
  basic: 'Basic',
  all_in_one_yearly: 'All-In-One Yearly',
  basic_yearly: 'Basic Yearly',
  test: 'Test',
  none: 'None',
};

export const Rules = {
  [plans.all_in_one_trial]: new Set([
    Types.Blog,
    Types.ContactToolEmail,
    Types.ContactToolTemplate,
    Types.Atelier,
  ]),

  [plans.basic_trial]: new Set([
    Types.ContactToolTemplate,
    Types.Blog,
    Types.Atelier,
  ]),

  [plans.all_in_one]: new Set([
    Types.Blog,
    Types.ContactToolEmail,
    Types.ContactToolTemplate,
    Types.Atelier,
  ]),

  [plans.basic]: new Set([
    Types.ContactToolTemplate,
    Types.Blog,
    Types.Atelier,
  ]),

  [plans.all_in_one_yearly]: new Set([
    Types.Blog,
    Types.ContactToolEmail,
    Types.ContactToolTemplate,
    Types.Atelier,
  ]),

  [plans.basic_yearly]: new Set([
    Types.ContactToolTemplate,
    Types.Blog,
    Types.Atelier,
  ]),
  [plans.test]: new Set([]),
  [plans.none]: new Set([]),
};

export const MASTER_ROLE = 'master';
export const EDITOR_ROLE = 'master';
export const ADMIN_ROLE = 'master';

export const permissionsFilterList = [
  { label: 'Admin', value: 'admin' },
  // { label: 'User', value: 'owner' },
  { label: 'Editor', value: 'editor' },
  { label: 'Analyst', value: 'analyst' },
  { label: 'Super Admin', value: 'master' },
  { label: 'All', value: '' },
];

export const permissionsList = [
  { label: 'Admin', value: 'admin' },
  { label: 'User', value: 'owner' },
  { label: 'Editor', value: 'editor' },
  { label: 'Analyst', value: 'analyst' },
];

export const usersStatus = [
  { label: 'Active', value: 'active' },
  { label: 'Inactive', value: 'inactive' },
];

export const permissions = {
  MASTER: 'master',
  ADMIN: 'admin',
  EDITOR: 'editor',
  ANALYST: 'analyst',
  EDITOR_OLD: 'owner',
  USER: 'user',
};
