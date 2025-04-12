import React, { useEffect, useState } from 'react';

import InstagramFeed from 'external-lib/feed';

const createIGavatar = (username = '') =>
  new InstagramFeed({
    username,
    container: document.querySelector('#socialMediaAvatar'),
    display_profile: true,
    display_biography: false,
    display_gallery: false,
  });

const precheckIGavatar = instagramName => {
  if (instagramName.length > 0) createIGavatar(instagramName);
  else document.querySelector('#socialMediaAvatar').innerHTML = '';
};

const SocialMediaAvatar = ({ instagramLink = '' }) => {
  const [TimeoutId, setTimeoutId] = useState(null);

  useEffect(() => {
    if (TimeoutId) {
      return clearTimeout(TimeoutId);
    }

    const timeoutId = setTimeout(() => {
      if (instagramLink.includes('https://www.instagram.com/')) {
        const link = 'https://www.instagram.com/';
        const instagramName = instagramLink.slice(link.length);
        precheckIGavatar(instagramName);
      } else if (instagramLink.includes('https://instagram.com/')) {
        const link = 'https://instagram.com/';
        const instagramName = instagramLink.slice(link.length);
        precheckIGavatar(instagramName);
      } else if (instagramLink.includes('@')) {
        const instagramName = instagramLink.slice(1);
        precheckIGavatar(instagramName);
      } else {
        precheckIGavatar(instagramLink);
      }
    }, 1000);

    setTimeoutId(timeoutId);
  }, [TimeoutId, instagramLink]);

  return <div id="socialMediaAvatar" />;
};

export default SocialMediaAvatar;
