import * as settings from '../../settings.json';
import { DESKTOP, MOBILE, TABLET } from '../devices';
import { SHOW_FOR_ROLE, SHOW_FOR_ROLE_LABEL } from './forms';
import { firstLetterNotSpace, required } from 'components/reduxForm/validators';
import Icons from 'components/icons';
import { Image } from 'components/reduxForm/image/image';
import Input from 'components/reduxForm/input/input';
import { Role } from 'constants/role';
import Select from 'components/reduxForm/select/select';
import { isoCountries } from 'components/countries/list';

const environment = process.env.NODE_ENV;

export const SLIDER_TITLE = 'Slider';
export const MODAL_EDIT_SLIDER_TITLE = 'Edit slider';
export const SLIDES_TITLE = 'Slides';
export const SLIDE_GENERATOR_TITLE = 'Slide generator';
export const REVIEWS_TITLE = 'Reviews';
export const JOIN_US_TITLE = 'Background first';
export const JOIN_OUR_TITLE = 'Background second';
export const SHIPMENT_SECTION_TITLE = 'Shipment section';
export const NEWSLETTER_SECTION_TITLE = 'Newsletter section';
export const SECTION_TITLE = 'Section';
export const SECTION_GENERATOR_TITLE = 'Section generator';
export const STYLES_HEADER = {
  title: 'Explore paintings by style',
  text:
    'Draint offers paintings from all styles in existence. Find the one that fits your taste.',
};

export const PAINTINGS_HEADER = {
  title: 'Latest paintings for sale',
  text: 'Our monthly selection of upcoming Draint top artist',
};

export const PAINTINGS_HEADER_FILTER_BY_PRICE = {
  title: 'Paintings for sale',
  text:
    'Our monthly selection of upcoming Draint top artist at affordable price',
};

const liveArtworkPattern = /^https:\/\/draint.art\/[a-zA-Z0-9_.]+\/artgallery\/paintings\/id\/[\w].+\/[\w].+/;
const clientArtworkPattern = /^https:\/\/client.draint.art\/[a-zA-Z0-9_.]+\/artgallery\/paintings\/id\/[\w].+\/[\w].+/;
const devArtworkPattern = /^http:\/\/localhost:3000\/[a-zA-Z0-9_.]+\/artgallery\/paintings\/id\/[\w].+\/[\w].+/;

const firstSlashSymbol = input =>
  input && input[0] === '/' ? undefined : 'First symbol should be /';

const actualPattern = () => {
  const currentAddress = settings.default[environment]?.front_server;

  switch (currentAddress) {
    case 'http://localhost:3000':
      return devArtworkPattern;

    case 'https://client.draint.art':
      return clientArtworkPattern;

    case 'https://draint.art':
      return liveArtworkPattern;

    default:
      return null;
  }
};

const draintArtworkUrl = input => {
  if (!actualPattern()) {
    return false;
  }

  return actualPattern().test(input)
    ? undefined
    : 'This link is not with artwork';
};

const fields = [
  {
    label: SHOW_FOR_ROLE_LABEL,
    name: SHOW_FOR_ROLE,
    list: Role.userRoleList,
    validate: [required],
    component: Select,
  },
  {
    name: 'image',
    label: 'Slide background',
    component: Image,
  },
  {
    label: 'Artwork link',
    name: 'artworkId',
    placeholder:
      'Add link to artwork page like https://draint.art/username/artgallery/paintings/id/38412214cbd-42324-24234-423234-42342342/title',
    maxLength: 110,
    disabled: true,
    validate: [required, draintArtworkUrl],
    component: Input,
  },
  {
    label: 'Title',
    name: 'title',
    placeholder: 'Add title for slide',
    maxLength: 65,
    validate: [required, firstLetterNotSpace],
    component: Input,
  },
  {
    label: 'Button text',
    name: 'button',
    placeholder: 'Add text for button',
    maxLength: 20,
    validate: [required, firstLetterNotSpace],
    component: Input,
  },
  {
    label: 'Button URL',
    name: 'url',
    placeholder: 'Add link for button like /features/artists',
    maxLength: 110,
    validate: [required, firstSlashSymbol],
    component: Input,
  },
  {
    label: 'Artist name',
    name: 'author',
    placeholder: 'Add Artist’s name',
    maxLength: 50,
    validate: [required, firstLetterNotSpace],
    component: Input,
  },
  {
    label: 'Artwork title',
    name: 'imageTitle',
    placeholder: 'Add image/artwork name',
    maxLength: 100,
    validate: [required, firstLetterNotSpace],
    component: Input,
  },
];

export const PARAMS_SLIDES = [
  {
    name: 'title',
    label: 'Title',
  },
  {
    name: 'url',
    label: 'Link to',
  },
  {
    name: 'button',
    label: 'Button text',
  },
  {
    name: 'author',
    label: 'Author',
  },
  {
    name: 'name',
    label: 'Artwork name',
  },
];

export const PARAMS_SECTIONS = [
  {
    name: 'title',
    label: 'Title',
  },
  {
    name: 'url',
    label: 'Link to',
  },
  {
    name: 'button',
    label: 'Button text',
  },
];

export const PARAMS_SHIPMENT_SECTIONS = [
  {
    name: 'title',
    label: 'Title',
  },
  {
    name: 'subtitle',
    label: 'Subtitle',
  },
  {
    name: 'url',
    label: 'Link to',
  },
  {
    name: 'button',
    label: 'Button text',
  },
];

export const PARAMS_NEWSLETTER_SECTIONS = [
  {
    name: 'title',
    label: 'Title',
  },
  {
    name: 'subtitle',
    label: 'Subtitle',
  },
];

const sectionsFields = [
  {
    label: SHOW_FOR_ROLE_LABEL,
    name: SHOW_FOR_ROLE,
    list: Role.userRoleList,
    validate: [required],
    component: Select,
  },
  {
    name: 'image',
    label: 'Section background',
    component: Image,
  },
  {
    label: 'Artwork link',
    name: 'artworkId',
    placeholder:
      'Add link to artwork page like https://draint.art/username/artgallery/paintings/id/38412214cbd-42324-24234-423234-42342342/title',
    maxLength: 110,
    disabled: true,
    validate: [required, draintArtworkUrl],
    component: Input,
  },
  {
    label: 'Title',
    name: 'title',
    placeholder: 'Add title for section',
    maxLength: 65,
    validate: [required, firstLetterNotSpace],
    component: Input,
  },
  {
    label: 'Button text',
    name: 'button',
    placeholder: 'Add text for button',
    maxLength: 20,
    validate: [required, firstLetterNotSpace],
    component: Input,
  },
  {
    label: 'Button URL',
    name: 'url',
    placeholder: 'Add link for button like /features/artists',
    maxLength: 110,
    validate: [required, firstSlashSymbol],
    component: Input,
  },
];

const shipmentSectionFields = [
  {
    label: SHOW_FOR_ROLE_LABEL,
    name: SHOW_FOR_ROLE,
    list: Role.userRoleList,
    validate: [required],
    component: Select,
  },
  {
    name: 'image',
    label: 'Section background',
    component: Image,
  },
  {
    label: 'Artwork link',
    name: 'artworkId',
    placeholder:
      'Add link to artwork page like https://draint.art/username/artgallery/paintings/id/38412214cbd-42324-24234-423234-42342342/title',
    maxLength: 110,
    disabled: true,
    validate: [required, draintArtworkUrl],
    component: Input,
  },
  {
    label: 'Title',
    name: 'title',
    placeholder: 'Add title for section',
    maxLength: 65,
    validate: [required, firstLetterNotSpace],
    component: Input,
  },
  {
    label: 'Subtitle',
    name: 'subtitle',
    placeholder: 'Add subtitle for section',
    maxLength: 65,
    validate: [required, firstLetterNotSpace],
    component: Input,
  },
  {
    label: 'Button text',
    name: 'button',
    placeholder: 'Add text for button',
    maxLength: 20,
    validate: [required, firstLetterNotSpace],
    component: Input,
  },
  {
    label: 'Button URL',
    name: 'url',
    placeholder: 'Add link for button like /features/artists',
    maxLength: 110,
    validate: [required, firstSlashSymbol],
    component: Input,
  },
];

const newsletterSectionFields = [
  {
    label: SHOW_FOR_ROLE_LABEL,
    name: SHOW_FOR_ROLE,
    list: Role.userRoleList,
    validate: [required],
    component: Select,
  },
  {
    name: 'image',
    label: 'Section background',
    component: Image,
  },
  {
    label: 'Artwork link',
    name: 'artworkId',
    placeholder:
      'Add link to artwork page like https://draint.art/username/artgallery/paintings/id/38412214cbd-42324-24234-423234-42342342/title',
    maxLength: 110,
    disabled: true,
    validate: [required, draintArtworkUrl],
    component: Input,
  },
  {
    label: 'Title',
    name: 'title',
    placeholder: 'Add title for section',
    maxLength: 65,
    validate: [required, firstLetterNotSpace],
    component: Input,
  },
  {
    label: 'Subtitle',
    name: 'subtitle',
    placeholder: 'Add subtitle for section',
    maxLength: 65,
    validate: [required, firstLetterNotSpace],
    component: Input,
  },
];

export const getFields = type => {
  let list = [
    'show_for_role',
    'image',
    'title',
    'button',
    'url',
    'author',
    'imageTitle',
  ];

  if (type === 'artwork') {
    list = ['show_for_role', 'artworkId', 'title', 'button', 'url'];
  }

  return fields.filter(({ name }) => list.includes(name));
};

export const getSectionsFields = isArtwork => {
  let list = ['show_for_role', 'image', 'title', 'button', 'url'];

  if (isArtwork) {
    list = ['show_for_role', 'artworkId', 'title', 'button', 'url'];
  }
  return sectionsFields.filter(({ name }) => list.includes(name));
};

export const getShipmentSectionsFields = isArtwork => {
  let list = ['show_for_role', 'image', 'title', 'subtitle', 'button', 'url'];

  if (isArtwork) {
    list = ['show_for_role', 'artworkId', 'title', 'subtitle', 'button', 'url'];
  }
  return shipmentSectionFields.filter(({ name }) => list.includes(name));
};

export const getNewsletterSectionsFields = isArtwork => {
  let list = ['show_for_role', 'image', 'title', 'subtitle'];

  if (isArtwork) {
    list = ['show_for_role', 'artworkId', 'title', 'subtitle'];
  }
  return newsletterSectionFields.filter(({ name }) => list.includes(name));
};

export const PRICE_FILTER = {
  key: 'price',
  label: 'Choose a price range',
  options: [
    {
      key: 'less500',
      res: [1, 500],
      value: '1-500 €',
      icon: Icons.Money,
    },
    {
      key: 'between501and1000',
      res: [501, 1000],
      value: '501-1000 €',
      icon: Icons.MoneyMiddle,
    },
    {
      key: 'between1001and2000',
      res: [1001, 2000],
      value: '1001-2000 €',
      icon: Icons.MoneyBig,
    },
    {
      key: 'more2000',
      res: [2001],
      value: 'more than 2000 €',
      icon: Icons.MoneyBig,
    },
  ],
};

export const COUNTRY_FILTERS = {
  key: 'country',
  label: 'Choose a country',
  options: [
    {
      key: 'All',
      res: null,
      value: 'All',
      icon: Icons.FindCountry,
    },
    ...isoCountries.map(({ cname, ccode }) => ({
      key: cname,
      res: ccode,
      value: cname,
      icon: Icons.FindCountry,
    })),
  ],
};

export const SIZE_FILTER = {
  key: 'size',
  label: 'Choose a size',
  options: [
    {
      key: 'clear',
      res: null,
      value: 'Painting Size',
      icon: Icons.PaintingMedium,
    },
    { key: 's', res: 's', value: 'Small Size', icon: Icons.PaintingSmall },
    { key: 'm', res: 'm', value: 'Medium Size', icon: Icons.PaintingMedium },
    { key: 'l', res: 'l', value: 'Large Size', icon: Icons.PaintingLarge },
    {
      key: 'xl',
      res: 'xl',
      value: 'Extra Large Size',
      icon: Icons.PaintingExtraLarge,
    },
  ],
};

export const ORIENTATION_FILTER = {
  key: 'orientation',
  label: 'Choose a perspective',
  options: [
    {
      key: 'clear',
      res: null,
      value: 'Orientation',
      icon: Icons.PaintingOrientation,
    },
    {
      key: 'vertical',
      res: 'vertical',
      value: 'Vertical Painting',
      icon: Icons.PaintingVertical,
    },
    {
      key: 'horizontal',
      res: 'horizontal',
      value: 'Horizontal Painting',
      icon: Icons.PaintingHorizontal,
    },
    {
      key: 'square',
      res: 'square',
      value: 'Square Painting',
      icon: Icons.PaintingExtraLarge,
    },
  ],
};

export const FILTERS = [SIZE_FILTER, ORIENTATION_FILTER, PRICE_FILTER];

export const ARTIST_FILTERS = [COUNTRY_FILTERS, PRICE_FILTER];

export const LIST_OF_PAGE_SIZE = [
  { label: '16', value: 16 },
  { label: '20', value: 20 },
  { label: '24', value: 24 },
];

export const INITIAL_ARTWORKS_LIMIT_BY_PRICE = {
  mobile: 4,
  tablet: 8,
  desktop: 16,
};

export const DEVICE =
  window.innerWidth > 960 ? DESKTOP : window.innerWidth < 550 ? MOBILE : TABLET;

export const DELETE_MODAL = {
  title: 'The slide will be deleted permanently',
  buttonConfirm: 'Delete',
  buttonReject: 'Cancel',
  headerDialog: 'Do you really want to delete a slide?',
};

export const FIELD_TYPE = {
  SQUARE: 'square',
  NO_BORDER: 'noBorder',
};

export const HOVER_FROM = {
  artworkCard: 'artworkCard',
  artworkGalleryCard: 'artworkGalleryCard',
  artworkSearchCard: 'artworkSearchCard',
};
