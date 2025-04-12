import React, { useState } from 'react';
import ArtworkSearchForm from '../artwork-search-form/artwork-search-form';
import ClientMap from '../../clientMap/client-map';
import search_styles from './artwork-search.module.scss';

const ArtworkSearch = ({
  loading,
  country,
  hashtag,
  style,
  title,
  medium,
  surface,
  countries,
  styles,
  mediums,
  surfaces,
  handleSearch,
  children,
}) => {
  const [showMap, setShowMap] = useState(false);

  return (
    <section>
      <div className={`container ${search_styles.container}`}>
        <h3 className={`group-title ${search_styles.title}`}>
          {/* Draint is home of more than 8.000 artwork */}
        </h3>
        <p className="group-subtitle">
          Use filters to search for the artwork by style, medium, surface.
        </p>
        <div className={search_styles.wrapper}>
          <div className={search_styles.content}>
            <ArtworkSearchForm
              loading={loading}
              className={search_styles.form}
              initialValues={{
                title,
                style,
                medium,
                surface,
                country,
                hashtag,
              }}
              styleOptions={styles}
              mediumOptions={mediums}
              surfaceOptions={surfaces}
              onSubmit={handleSearch}
              onShowMap={() => setShowMap(!showMap)}
            />
            <div
              className={`${search_styles.map} ${
                showMap ? search_styles.show : ''
              }`}
            >
              <ClientMap data={countries} loading={loading} />
            </div>
          </div>
          {children}
        </div>
      </div>
    </section>
  );
};

export { ArtworkSearch };
