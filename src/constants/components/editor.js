const toolbarOptions = [
  [{ header: [false, 2, 3, 4] }],
  ['bold', 'italic', 'underline', { color: [] }, { background: [] }],
  ['blockquote'],
  [{ list: 'ordered' }, { list: 'bullet' }, { align: [] }],
  ['link', 'image'],
];

export const quillOptions = {
  modules: {
    toolbar: toolbarOptions,
  },

  theme: 'snow',
};
