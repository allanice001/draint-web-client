import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Icons from '../../../../icons';
import React from 'react';
import styles from './payouts.module.scss';

const faq = [
  { label: 'How payouts on Draint work?', description: '' },
  { label: 'Adding payout info?', description: '' },
  { label: 'When will I get my payout?', description: '' },
];

function PayoutFAQ() {
  return (
    <div className={`container ${styles.wrapper}`}>
      <section className={styles.section} style={{ flex: 1 }}>
        <h3 className={`group-title ${styles.title}`}>FAQs</h3>

        <div className={styles.accordion}>
          {faq.map((el, i) => (
            <ExpansionPanel classes={{ root: styles.root }} key={i}>
              <ExpansionPanelSummary
                classes={{
                  content: styles.header,
                }}
                expandIcon={<Icons.ArrowRight className={styles.icon} />}
              >
                {el.label}
              </ExpansionPanelSummary>
              {el.description && (
                <ExpansionPanelDetails>{el.description}</ExpansionPanelDetails>
              )}
            </ExpansionPanel>
          ))}
        </div>
      </section>
    </div>
  );
}

export default PayoutFAQ;
