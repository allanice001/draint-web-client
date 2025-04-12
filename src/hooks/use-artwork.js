import { useEffect, useState } from 'react';
import { Artwork } from 'models';
import axios from 'dataLayer/axiosInstance';

export const useArtwork = id => {
  const [artwork, setArtwork] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/api/artworks/id/${id}`)
      .then(res => {
        const { data } = res;
        const { artworkData, styles, mediums, surfaces } = data;
        setArtwork(
          Artwork.create({
            ...artworkData,
            styles,
            mediums,
            surfaces,
          })
        );
      })
      .catch(error => {
        setError(error);
      })
      .finally(() => setLoading(false));
  }, [id]);

  return { artwork, loading, error };
};
