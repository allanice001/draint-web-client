export const HOME_PAGE_NEW_ARTISTS = 'newArtists';
export const HOME_PAGE_ARTWORK_FOR_SALE = 'artworksForSale';
export const HOME_PAGE_STYLES = 'styles';

export const HOME_PAGE_DEFAULT_PAGE = 1;
export const HOME_PAGE_LIMIT = 8;

export const HOMEPAGE_BLOG_CONTENT = {
  title: 'Latest on Draint blog',
  button_name: 'Blog Page',
  button_link: '/blog',
  link_label: 'Read more...',
  author: 'By Draint',
};

export const PAINTINGS_BY_ARTISTS = {
  title: 'Paintings by artists close by',
  button_show: 'Show more',
  button_back: 'Back to start',
  no_found: 'Sorry, no results found',
};

export const HOME_PAGE_META_HELMET_KEYWORDS = `
  draint artgallery, originnal paintings, original artworks, online gallery, artists online,
  find artists, buy art, purchase art, 'art dealer, wall art, deco art, affordable art,
  modern art, bansky art
`;

export const HOME_PAGE_META_HELMET_SCRIPT = [
  {
    type: 'application/ld+json',
    innerHTML: `{
              "@context": "http://www.schema.org",
              "@type": "Organization",
              "name": "Draint",
              "url": "https://draint.art/",
              "sameAs": [
                "https://twitter.com/draintgallery?lang=en",
                "https://www.facebook.com/draint.artgallery/",
                "https://www.youtube.com/channel/UCGaiLrVGXJ-16haPhlo1gKg"
              ],
              "logo": "https://draint.art/static/media/new_logo.80d27668.png",
              "description": "Draint is a shopsystem and do-it-yourself websitebuilder specified for artists and their original artwork to sell at lowest commission fees. Sign up now. Following up, we are the online artgallery and marketplace for everyone to become a collector, buy and sell original paintings, invest in art, trade at a profit and mange the artportfolio.",
              "address": {
                "@type": "PostalAddress",
                "postOfficeBoxNumber": "Löhrstraße 87A",
                "addressLocality": "Atascadero",
                "addressRegion": "Koblenz",
                "postalCode": "56068",
                "addressCountry": "Germany"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "034974 71575",
                "contactType": "Customer Service"
              }
            }`,
  },
];
