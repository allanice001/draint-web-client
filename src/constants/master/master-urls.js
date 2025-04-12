import {
  ARTWORKS,
  FB_CATALOG_ROOT,
} from 'constants/routes/masterModule/fbCatalog';
import {
  BLOG,
  FEATURES,
  FEEDBACK,
  HASHTAGS,
  HOMEPAGE,
  LEGAL,
  MASTER_ROOT,
  OFFERS,
  ORDERS,
  PAYOUTS_REQUESTS,
  PERMISSION,
  SHIPPING_REQUESTS,
  SLIDER,
  SOCIAL_MEDIA,
} from 'constants/routes/masterModule/dashboard';
import {
  MY_VITA_PROFILES,
  MY_VITA_ROOT,
} from 'constants/routes/masterModule/myVita';
import {
  NEWSLETTER_ROOT,
  SUBSCRIPTION,
} from 'constants/routes/masterModule/newsletter';

import { ARTISTS } from 'constants/routes/masterModule/artists';
import { HOME } from 'constants/routes/mainRout';
import { MODALS_ROOT } from 'constants/routes/masterModule/modal';

const urls = [
  { label: 'BACK TO DRAINT', link: HOME },
  { label: 'Dashboard', link: MASTER_ROOT },
  { label: 'Artists', link: ARTISTS },
  { label: 'Permission', link: PERMISSION },
  { label: 'Orders', link: ORDERS },
  { label: 'Offers', link: OFFERS },
  { label: 'Blog', link: BLOG },
  { label: 'Vita', link: MY_VITA_ROOT + MY_VITA_PROFILES },
  { label: 'Feedback', link: FEEDBACK },
  { label: 'Shipping Requests', link: SHIPPING_REQUESTS },
  { label: 'Payouts Requests', link: PAYOUTS_REQUESTS },
  { label: 'Homepage', link: HOMEPAGE + SLIDER },
  { label: 'Hashtags', link: HASHTAGS },
  { label: 'Artist Features', link: FEATURES },
  { label: 'Letters', link: NEWSLETTER_ROOT + SUBSCRIPTION },
  { label: 'Legal', link: LEGAL },
  { label: 'Modal', link: MODALS_ROOT },
  { label: 'Social Media', link: SOCIAL_MEDIA },
  { label: 'FB Catalog', link: FB_CATALOG_ROOT + ARTWORKS },
];

// Add '/master' prefix to links
const getMasterUrls = urls => {
  return urls.map(url => {
    if (url.link !== '/' && url.link !== MASTER_ROOT) {
      url.link = MASTER_ROOT + url.link;
    }
    return url;
  });
};

export const masterUrls = getMasterUrls(urls);
