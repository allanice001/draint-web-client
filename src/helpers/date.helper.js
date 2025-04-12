const dateHelper = {
  getReadableDateString: sourceDate => {
    const date = new Date(sourceDate);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  },
};

export default dateHelper;
