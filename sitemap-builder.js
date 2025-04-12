require('babel-register'); // 1.

const router = [
    { path: '/' },
    { path: '/artists' },
    { path: '/artist/id/:id' },
    { path: '/artist/:username' },
    { path: '/artworks' },
    { path: '/artwork/id/:id' },    
    { path: '/terms' },
    { path: '/pricing' },
    { path: '/privacy' },
    { path: '/signup' },
    { path: '/signup/artist' },
    { path: '/signup/collector' },
    { path: '/signin' },
]
const Sitemap = require('react-router-sitemap').default;

(
    new Sitemap(router)
        .build('https://draint.art/')
        .save('./public/sitemap.xml')
); // 2.

console.log("The sitemap was built."); // Only shows this message after everything works well.

