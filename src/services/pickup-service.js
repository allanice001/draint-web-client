import {
  FRIDAY,
  MILLISECONDS,
  OVERDUE_DAYS,
  OVERDUE_DAYS_MANUAL,
  SATURDAY,
  STANDARD_FORMAT,
  SUNDAY,
} from 'constants/components/shipment-pick-up/shipment-pick-up';

export function setDateDay(date, day = OVERDUE_DAYS, toAdd = true) {
  if (date && day) {
    const newDate = new Date(date);
    if (toAdd) {
      return new Date(newDate.setDate(newDate.getDate() + day));
    }

    return new Date(newDate.setDate(newDate.getDate() - day));
  }

  return '';
}

export function setMaxDate(isManual, date) {
  return isManual
    ? setDateDay(date, OVERDUE_DAYS_MANUAL).toISOString()
    : setDateDay(date).toISOString();
}

export function setPickUpDay(date) {
  if (date) {
    const newDate = new Date(date);

    if (newDate.getDay() === FRIDAY) {
      return new Date(newDate.setDate(newDate.getDate() + 3));
    }

    return new Date(newDate.setDate(newDate.getDate() + 1));
  }

  return '';
}

export function datesAreOnSameDay(first, second) {
  return (
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate()
  );
}

export function initialDate(isManual) {
  const date = new Date();
  const today = isManual ? setDateDay(date, 5) : date;

  if (today.getDay() === SUNDAY) {
    today.setDate(today.getDate() + 1);

    return today.toString();
  }

  if (today.getDay() > SUNDAY && today.getDay() < FRIDAY) {
    !isManual && today.setDate(today.getDate() + 1);

    return today.toString();
  }

  if (today.getDay() === FRIDAY) {
    today.setDate(today.getDate() + 3);

    return date.toString();
  }

  if (today.getDay() === SATURDAY) {
    today.setDate(today.getDate() + 2);

    return today.toString();
  }
}

export function shouldDisableDate(day) {
  return (
    day.getDay() === SUNDAY ||
    day.getDay() === SATURDAY ||
    day.toDateString() === new Date().toDateString()
  );
}

export function shouldDisableDateManual(day) {
  return day.getDay() === SUNDAY || day.getDay() === SATURDAY;
}

export function checkOverdue(pickupDate, isManual) {
  if (pickupDate) {
    const days = isManual ? OVERDUE_DAYS_MANUAL : OVERDUE_DAYS;
    const date = new Date(pickupDate);
    const overdue = date.setDate(date.getDate() + days);

    return new Date(overdue).toDateString() === new Date().toDateString();
  }

  return true;
}

export function disableConfirm(pickupDate) {
  const parsedDate = Date.parse(pickupDate);
  const day = new Date(parsedDate);

  return shouldDisableDate(day);
}

export function dateToString(date) {
  const newDate = new Date(date);

  return newDate.date();
}

export function formatDate(date, format) {
  if (format === STANDARD_FORMAT) {
    const newDate = new Date(date);

    return `${newDate.getMonth() +
      1} ${newDate.getDate()} ${newDate.getFullYear()}`;
  }

  if (format === MILLISECONDS) {
    const newDate = new Date(date);
    const formatDate = `${newDate.getMonth() +
      1} ${newDate.getDate()} ${newDate.getFullYear()}`;
    const milliDate = new Date(formatDate);

    return milliDate.getTime();
  }
}
