const isEven = num => num % 2 === 0;

export const mergeArraysInTwo = containerArray => {
  const buff1 = [];
  const buff2 = [];
  containerArray.forEach((array, parentIdx) => {
    array.forEach((el, idx) => {
      const balancer = isEven(parentIdx) ? 0 : 1;
      if (isEven(balancer + idx)) {
        buff1.push(el);
      } else {
        buff2.push(el);
      }
    });
  });

  return [buff1, buff2];
};
