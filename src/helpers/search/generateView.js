export const generateView = (list = [], loading) => {
  const data = loading ? Array.from(new Array(15)) : list;
  const view = [];

  const pushItem = (arr, i, el) => {
    if (arr[i]) {
      arr[i].push(el);
    } else {
      arr[i] = [el];
    }
  };

  data.forEach((el, i) => {
    if (i === 0 || i % 3 === 0) {
      pushItem(view, 0, el);
    }

    if (i === 1 || i % 3 === 1) {
      pushItem(view, 1, el);
    }

    if (i === 2 || i % 3 === 2) {
      pushItem(view, 2, el);
    }
  });

  return view;
};
