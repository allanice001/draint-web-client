const ARTIST = 'artist';
const COLLECTOR = 'collector';
const UNAUTHORIZED = 'unauthorized';
const FOR_ARTIST = 'for artist';
const FOR_COLLECTOR = 'for collector';
const FOR_UNAUTHORIZED = 'for unauthorized';

const USER_ROLE_LIST = [
  { id: ARTIST, label: ARTIST, value: ARTIST, name: ARTIST, tab: FOR_ARTIST },
  {
    id: COLLECTOR,
    label: COLLECTOR,
    value: COLLECTOR,
    name: COLLECTOR,
    tab: FOR_COLLECTOR,
  },
  {
    id: UNAUTHORIZED,
    label: UNAUTHORIZED,
    value: UNAUTHORIZED,
    name: UNAUTHORIZED,
    tab: FOR_UNAUTHORIZED,
  },
];

export const Role = {
  Artist: ARTIST,
  Collector: COLLECTOR,
  userRoleList: USER_ROLE_LIST,
};
