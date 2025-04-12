import moment from 'moment';

function formatDate(date) {
  if (date) {
    return moment(date, 'DD.MM.YYYY', false).format('DD.MM.YYYY');
  }
}

export default formatDate;
