import staticUrls from 'constants/images/static-urls';

// const banner = {
//   image: 'https://picsum.photos/1200/1300',
//   title: 'Hi! I love vibrant colors and make all kinds of artworks with them.',
// };

// const posts = [
//   {
//     image: 'https://picsum.photos/600/600',
//     description:
//       'Description text dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
//     tags: [],
//   },
//   {
//     image: 'https://picsum.photos/600/600',
//     description:
//       'Description text dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
//     tags: ['artist', 'gold', 'studio'],
//   },
//   {
//     image: 'https://picsum.photos/600/600',
//     description:
//       'Description text dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
//     tags: ['artist', 'gold', 'studio'],
//   },
//   {
//     image: 'https://picsum.photos/600/600',
//     description:
//       'Description text dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
//     tags: ['artist', 'gold', 'studio'],
//   },
// ];

// const notes = {
//   image: 'https://picsum.photos/600/600',
//   blockquote:
//     ',,No artist of performer can entirely escape the lure of fame and its promise of endless admiration and respect, but there is a heavy price one must pay for it.’’',
//   topContent:
//     'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil.',
//   bottomContent:
//     'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
// };

const process = {
  // image: 'https://picsum.photos/600/600',
  content: [
    {
      key: 'process',
      answer: '',
    },
    {
      key: 'enjoy',
      answer: '',
    },
  ],
};

export class AtelierService {
  getAtelierData() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          emptyPageImage: staticUrls.image.emptyPage,
          // banner,
          // posts,
          // notes,
          process,
        });
      }, 1000);
    });
  }

  saveForm(value) {
    return new Promise.resolve();
  }
}
