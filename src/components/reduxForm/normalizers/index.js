const normalizers = {
  email: value => {
    if (!value) return value;

    return value.trim();
  },
};

export default normalizers;
