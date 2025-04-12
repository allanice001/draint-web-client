import { BLOG } from 'constants/routes/userModule/gallery';
import Icons from 'components/icons';
import { blogTabs } from 'constants/blog';

export const tabList = [
  {
    path: BLOG,
    label: 'Show All',
    icon: Icons.ThreeDots,
  },
];

export const sortOptions = [
  { label: 'Most recent', value: '' },
  { label: 'Most popular', value: 'popular' },
];

export const blogIcons = {
  [blogTabs.ART_WORLD]: Icons.ArtWorld,
  [blogTabs.ART_TIPS]: Icons.ArtTips,
  [blogTabs.COMMUNITY]: Icons.Community,
  [blogTabs.MY_ATELIER]: Icons.Easel,
};
