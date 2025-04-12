import CanvasJSReact from 'external-lib/canvasjs.react';
import { getPurchaseHistoryOptions } from 'helpers/artowork-card/get-purchase-history-options';
import { monthNames } from 'components/chart/chart';
import styles from './artwork-card.module.scss';

export const ArtworkPurchaseHistory = ({ artwork }) => {
  const options = getPurchaseHistoryOptions(
    artwork.purchase_history.map((el, i) => ({
      x: i + 1,
      y: +el.price,

      label: `${monthNames[new Date(el.created_at).getMonth()]} ${new Date(
        el.created_at
      ).getFullYear()}`,
    }))
  );

  return (
    <div className={styles.history}>
      <div className={styles.chart}>
        <CanvasJSReact.CanvasJSChart
          options={options}
          history={artwork.purchase_history}
        />
      </div>
      <div className={styles.right}>
        <div>
          <b className={styles.price}>
            € {Number(artwork.above_original_price.toFixed(2))}
          </b>
          <br />
          {artwork.above_original_price < 0
            ? 'below original price'
            : 'above original price'}
        </div>

        <div>
          <b className={styles.price}>
            € {Number(artwork.avg_price_increase.toFixed(2))}
          </b>
          <br />
          avg. price {artwork.avg_price_increase < 0 ? 'decrease' : 'increase'}
        </div>
      </div>
    </div>
  );
};
