import { APPROVED, DISAPPROVED, PENDING, WAITING } from './statuses';

export const statusList = [
  { label: 'Approved', value: APPROVED },
  { label: 'Disapproved', value: DISAPPROVED },
  { label: 'Pending', value: PENDING },
  { label: 'Waiting to approve', value: WAITING },
  { label: 'All', value: '' },
];

export const onPublicPage = [
  { label: 'Visible on public page', value: 'true' },
  { label: 'Not visible on public page', value: 'false' },
  { label: 'All ateliers', value: '' },
];
