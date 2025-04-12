import React, { useEffect, useState } from 'react';

import { Artwork } from 'models/artwork';
import { ArtworkCard } from '../../artwork/artwork-card/artwork-card';
import { ArtworkService } from 'services/artwork-service';
import { CardSlider } from '../../card-slider/card-slider';

const artworkService = new ArtworkService();

function TradeCarousel() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    setLoading(true);
    artworkService
      .getInvestedArtworks({ perPage: 12 })
      .then(res => {
        setData(res.data.artworks);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <CardSlider
      title="Frequently invested in:"
      withHistory
      list={data}
      limit={4}
      loading={loading}
      Model={Artwork}
      style={{ minHeight: '560px' }}
      item={(artwork, i) => (
        <div>
          <ArtworkCard
            artwork={artwork}
            key={artwork ? artwork.id : i}
            withHistory
          />
        </div>
      )}
    />
  );
}

export default TradeCarousel;
