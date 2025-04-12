import Icons from '../../../../icons';
import React from 'react';
import staticUrls from 'constants/images/static-urls';
import styles from './payouts.module.scss';

const payoutPlatforms = [
  {
    active: false,
    img: staticUrls.image.payoneer,
    description: 'MasterCard ending in 0392',

    features: [
      'Get paid in 3-4 hours',
      'Connecy existing account',
      'May include fees',
    ],

    actions: [
      { label: 'Edit', condition: status => status, action: () => {} },
      { label: 'Remove', condition: status => status, action: () => {} },
      {
        label: 'Add Payoneer method',
        condition: status => !status,
        action: () => {},
      },
    ],
  },
  {
    active: false,
    img: staticUrls.image.paypal,
    description: 'MasterCard ending in 0392',

    features: [
      'Get paid in 3-4 hours',
      'Connecy existing account',
      'May include fees',
    ],

    actions: [
      { label: 'Edit', condition: status => status, action: () => {} },
      { label: 'Remove', condition: status => status, action: () => {} },
      {
        label: 'Add PayPal method',
        condition: status => !status,
        action: () => {},
      },
    ],
  },
  {
    active: false,
    Icon: Icons.BankTransfer,
    description: 'MasterCard ending in 0392',

    features: [
      'Get paid in 3-4 hours',
      'Connecy existing account',
      'May include fees',
    ],

    actions: [
      { label: 'Edit', condition: status => status, action: () => {} },
      { label: 'Remove', condition: status => status, action: () => {} },
      {
        label: 'Add Bank transfer',
        condition: status => !status,
        action: () => {},
      },
    ],
  },
];

function PayoutPlatforms() {
  return (
    <div className={`container ${styles.wrapper}`}>
      <section className={styles.section} style={{ flex: 1 }}>
        <div className={styles.header}>
          <h3 className={`group-title ${styles.title}`} style={{ flex: 1 }}>
            Payout Methods
          </h3>
        </div>

        <div className={styles.methods}>
          {payoutPlatforms.map(
            ({ Icon, img, description, features, actions, active }, i) => (
              <div
                className={`${styles.section} ${styles.method} ${
                  active ? styles.active : ''
                }`}
                style={{ flex: 1 }}
                key={i}
              >
                {active && (
                  <span className={styles.check}>
                    <Icons.Check />
                  </span>
                )}

                <div className={styles.method__header}>
                  {img && <img className={styles.img} src={img} alt="" />}
                  {Icon && <Icon />}
                </div>

                {active && <p>{description}</p>}

                {!active && (
                  <ul>
                    {features.map((el, i) => (
                      <li key={i}>{el}</li>
                    ))}
                  </ul>
                )}

                <footer className={styles.actions}>
                  {/*{actions.map((el, i) => el.condition(active) && (*/}
                  {/*  <Tooltip title="Coming soon" aria-label="add" key={i}>*/}
                  {/*    <button*/}
                  {/*      disabled*/}
                  {/*      type="button"*/}
                  {/*      className={`secondary-button ${styles.button}`}*/}
                  {/*      onClick={el.action}*/}
                  {/*    >*/}
                  {/*      {el.label}*/}
                  {/*    </button>*/}
                  {/*  </Tooltip>*/}
                  {/*))}*/}
                </footer>
              </div>
            )
          )}
        </div>
      </section>
    </div>
  );
}

export default PayoutPlatforms;
