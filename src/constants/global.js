export const __prod__ = process.env.NODE_ENV === 'production';

export const PHONE_REGEXP = /^(?:\d ?){6,14}\d$/;

export const PHONE_REGEXP_GLOBAL = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/gi;

export const EMAIL_REGEXP = /^(([^\s"(),.:;<>@[\\\]]+(\.[^\s"(),.:;<>@[\\\]]+)*)|(".+"))@((\[(?:\d{1,3}\.){3}\d{1,3}])|(([\dA-Za-z-]+\.)+[A-Za-z]{2,}))$/;

export const EMAIL_REGEXP_GLOBAL = /(([^\s"(),.:;<>@[\\\]]+(\.[^\s"(),.:;<>@[\\\]]+)*)|(".+"))@((\[(?:\d{1,3}\.){3}\d{1,3}])|(([\dA-Za-z-]+\.)+[A-Za-z]{2,}))/gi;

export const PRICE_REGEXP = /^([1-9]|[1-9][0-9]{1,5})(\.\d{1,2})?$/;

export const POINTS_REGEXP = /^([1-5])?$/;

export const NUMBER_REGEXP = /^\d+$/;

export const MAX_POINTS_MESSAGES = 'This field should be in range from 1 to 5';

export const NUMBER_OF_DIMENSIONS_REGEXP = /^([1-9]|[1-9][0-9]+)$/;

export const CYRILLIC_REGEXP = /[ЁА-яё]/;

export const NUM_LATIN_REGEXP = /^[\d\sA-Za-z]+$/;

export const AUTOCOMPLETE_ROUTE =
  'https://maps.googleapis.com/maps/api/place/findplacefromtext/json';

export const SPACE_PREFIX_REGEX = /^\s+/;

export const WHITESPACE_REGEXP = /\s/;

export const HASHTAG_REGEXP = /^[a-zA-Z0-9#]+$/;

export const MASTER_HASHTAG_REGEXP = /^[a-zA-Z0-9_]+$/;

export const YEAR_REGEXP = /^(?=.*?(19[56789]|20).*)\d{4}$/;

export const INSTA_REGEXP = /[\w]+/;

export const INSTAGRAM_LINK_REGEX = /^https:\/\/www.instagram.com\/[\w](?!.*?\.{2})[\w.]{1,28}[\w]$/;

export const INSTAGRAM_USERNAME_REGEX = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;

export const INSTAGRAM_LINK_DELIMITER = '.com/';

export const VERIFIED = 'verified';

export const UNVERIFIED = 'unverified';

export const DECLINED = 'declined';

export const PENDING = 'pending';

export const ARTWORKS_UPLOAD_LIMIT_ON_TEST_PLAN = 3;

export const MAX_ARTWORK_PRICE = 999999.99;

export const MAX_NAME_LENGTH = 20;

export const UPDATE_PASSWORD_BY_ADMIN = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?\d)(?=.*?[!#$%&*?@^_-]).{8,}$/;

export const TEST_PLAN = 'Test';

export const DEVICE_REGEX = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;

export const PLATFORM_REGEX = /iPad|iPhone|MacIntel|Macintosh/;

export const RECOVERED = 'recovered';

export const ACCOUNT_DELETED = 'accountDeleted';

export const SAVE_BUTTON_TEXT = 'Save';

export const CLEAR_BUTTON_TEXT = 'Clear';

export const MESSAGE_SOMETHING_WENT_WRONG = 'Something went wrong';

export const INSTAGRAM_LINK = 'https://www.instagram.com/';

export const INSTAGRAM_LINKS_LEGACY = [
  'https://www.instagram.com/',
  'https://www.instagram.com',
  'www.instagram.com',
  'instagram.com',
  'https://www.instagram.com/null',
];

export const DRAINT_NAME = 'draint';

export const AVATAR_PARAM = '48px';
