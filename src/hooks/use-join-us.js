import { useSelector } from 'react-redux';

export const useJoinUs = () => {
  const { account } = useSelector(state => state.user);
  const { email, is_artist: isArtist } = account;

  return {
    email,
    isArtist,
  };
};
