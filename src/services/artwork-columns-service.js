function pushItems (arr, i, el) {
  if (arr[i]) {
    arr[i].push(el);
  } else {
    arr[i] = [el];
  }
};

export function setColumns (data, column, desktop) {
  if (desktop) {
    data.forEach((el, i) => {
      if (i === 0 || i % 3 === 0) {
        pushItems(column, 0, el);
      }

      if (i === 1 || i % 3 === 1) {
        pushItems(column, 1, el);
      }

      if (i === 2 || i % 3 === 2) {
        pushItems(column, 2, el);
      }
    });
  } else {
    data.forEach((el, i) => {
      pushItems(column, i, el);
    });
  }
};