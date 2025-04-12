import {
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
} from '@material-ui/core';

import { CustomRadioGroup } from 'components/master/custom-radio-group/custom-radio-group';
import React from 'react';
import styles from './masterFeedbackFilter.module.scss';

const MasterFeedbackFilter = ({
  loading,
  onlyNew,
  filter,
  setFilter,
  count,
}) => (
  <Card className={styles.wrapper}>
    <CardContent className={styles.content}>
      <CustomRadioGroup
        options={[
          {
            value: '',
            label: 'All',
          },
          {
            value: 'on_delete',
            label: 'On delete',
          },
          {
            value: 'on_feedback_page',
            label: 'From feedback page',
          },
        ]}
        label="Status"
        value={filter}
        onChange={e => setFilter('filter', e.target.value)}
        name="filter"
        disabled={loading}
      />

      <FormControlLabel
        className={styles.card__action}
        label="Only new"
        control={
          <Checkbox
            disabled={loading}
            checked={onlyNew}
            color="primary"
            onChange={() => setFilter('onlyNew', !onlyNew)}
          />
        }
      />
      <label>
        Total: <b>{count}</b>
      </label>
    </CardContent>
  </Card>
);

export default MasterFeedbackFilter;
