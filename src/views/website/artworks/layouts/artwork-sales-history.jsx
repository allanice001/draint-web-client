import './artworkSalesHistory.scss';
import ArtworkSalesChart from './artwork-sales-chart';
import InfoBlock from './info-block';
import React from 'react';
import { Skeleton } from '@material-ui/lab';
import moment from 'moment';
import staticUrls from 'constants/images/static-urls';
import styles from './artworkSalesHistory.module.scss';

const FIRST_PURCHASE = 'First purchase was on ';

function ArtworkSalesHistory({ loading, purchaseHistory, inWatchlist }) {
  const {
    artworks_purchase_history,
    above_original_price,
    avg_price_increase,
    avg_month_increase,
  } = purchaseHistory;

  if (inWatchlist && artworks_purchase_history.length === 1) {
    return (
      <div className={styles.content_one_purchase}>
        <p className={styles.content_one_purchase__text}>{FIRST_PURCHASE}</p>
        <p className={styles.content_one_purchase__text}>
          {`${moment(artworks_purchase_history[0].created_at).format(
            'DD MMMM YYYY'
          )} for`}
          <b className={styles.content_one_purchase__price}>
            € {artworks_purchase_history[0].price}
          </b>
        </p>
      </div>
    );
  }

  return (
    <section>
      <div className="container">
        {!inWatchlist && <h3 className="group-title">Artwork sales history</h3>}
        <div className={styles.content}>
          <div className={styles.chart}>
            {loading ? (
              <Skeleton variant="rect" width="100%" height={250} />
            ) : !artworks_purchase_history.length ? (
              <div className={styles.placeholder__wrap}>
                <img
                  alt="Artwork sales placeholder"
                  className={styles.placeholder}
                  src={staticUrls.svg.earnMoney}
                  title="Artwork sales placeholder"
                />
              </div>
            ) : (
              <ArtworkSalesChart
                inWatchlist={inWatchlist}
                purchaseHistory={artworks_purchase_history}
              />
            )}
          </div>
          {loading ? (
            <div className={styles.info}>
              <div className={styles.row}>
                <Skeleton variant="rect" width="100%" height={80} />
                <Skeleton variant="rect" width="100%" height={80} />
              </div>
              <div className={styles.row}>
                <Skeleton variant="rect" width="100%" height={80} />
                <Skeleton variant="rect" width="100%" height={80} />
              </div>
            </div>
          ) : (
            <div className={styles.info}>
              {inWatchlist ? (
                <div className={styles.row_in_watchlist}>
                  <InfoBlock
                    inWatchlist
                    param={`€ ${Number(above_original_price.toFixed(2))}`}
                    description="Above original price"
                  />
                  <InfoBlock
                    inWatchlist
                    param={`€ ${Number(avg_price_increase.toFixed(2))}`}
                    description="Avg.price increase per sale"
                  />
                </div>
              ) : (
                <>
                  <div className={styles.row}>
                    <InfoBlock
                      param={`€ ${Number(above_original_price.toFixed(2))}`}
                      description="Above original price"
                    />
                    <InfoBlock
                      param={artworks_purchase_history.length}
                      description="Number of sales"
                    />
                  </div>
                  <div className={styles.row}>
                    <InfoBlock
                      param={`€ ${Number(avg_price_increase.toFixed(2))}`}
                      description="Avg.price increase per sale"
                    />
                    <InfoBlock
                      param={Number(avg_month_increase.toFixed(2))}
                      description="Avg.months between two sales"
                    />
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default ArtworkSalesHistory;
