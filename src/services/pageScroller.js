export const pageScroll = (to = 0, behavior = 'smooth') => {
  window.scrollTo({
    top: to,
    behavior,
  });
};
