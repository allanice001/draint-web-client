import { generateUuid } from "./tokenService";

export const addHashtag = (data, hashtags, setHashtags) => {
  const alreadyAddedHashtags = hashtags.map(hashtag => hashtag.name);
  const currentHashtags = data.hashtag
    .toLowerCase()
    .split('#')
    .filter(el => el);
  const uniqueHashtags = Array.from(new Set(currentHashtags))
  const hashtagsWithIds  = uniqueHashtags.map(hashtag => {
    if (!alreadyAddedHashtags.includes(hashtag) && hashtag.length > 0) {
      return { name: hashtag, id: generateUuid() }
    }
    return undefined;
  }).filter(el => el !== undefined)
  setHashtags([...hashtags, ...hashtagsWithIds].slice(0, 10));
};

export const removeHashtag = (
  id, hashtag_id, hashtags, setHashtags, deletedHashtags, setDeletedHashtags,
) => {
  if (hashtag_id) setDeletedHashtags([...deletedHashtags, id]);
  setHashtags([...hashtags.filter(el => el.id !== id)]);
};
