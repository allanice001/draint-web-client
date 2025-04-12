import './editorStyles.css';

import { ERROR } from 'constants/components/message-statuses';
import Quill from 'quill';
import displayMessage from 'redux/global/notiifcation/actions/displayMessage';
import { quillOptions } from 'constants/components/editor';
import store from 'redux/store';

const Image = Quill.import('formats/image');
Image.sanitize = url => url;

const MAX_FILE_UPLOAD = 5;

class Editor extends Quill {
  images = [];
  imagesUrls = [];

  constructor(node) {
    super(node, quillOptions);
  }

  _showError(message) {
    store.dispatch(displayMessage(message, ERROR));
  }

  addImage(newImage, url) {
    if (this.images.length >= MAX_FILE_UPLOAD) {
      this._showError(`You cannot upload more than ${MAX_FILE_UPLOAD} images`);
      return null;
    }

    this.images.push(newImage);
    this.imagesUrls.push(url);
  }

  removeImageByUrl(url) {
    const idx = this.imagesUrls.indexOf(url);
    this.imagesUrls = this.imagesUrls.filter(u => u !== url);
    this.images.splice(idx, 1);
  }

  getImages() {
    return this.images;
  }

  getImagesUrls() {
    return this.imagesUrls;
  }

  resetImages() {
    this.images = [];
    this.imagesUrls = [];
  }
}

function selectLocalImage(editor) {
  const input = document.createElement('input');
  input.setAttribute('type', 'file');
  input.click();

  input.onchange = () => {
    const image = input.files[0];

    if (!/^image\//.test(image.type)) {
      return;
    }

    const url = URL.createObjectURL(image);

    if (editor.addImage(image, url) !== null) {
      const range = editor.getSelection();
      editor.insertEmbed(range.index, 'image', url);
    }
  };
}

function EditorCreator(node) {
  const editor = new Editor(node);

  editor.getModule('toolbar').addHandler('image', () => {
    selectLocalImage(editor);
  });

  editor.on('text-change', (_, oldDelta, source) => {
    if (source !== 'user') {
      return;
    }

    let currentContents = editor.getContents();
    let diff = currentContents.diff(oldDelta);

    const removeImageUrl = diff.ops[1]?.insert?.image;
    if (removeImageUrl) {
      editor.removeImageByUrl(removeImageUrl);
    }
  });

  return editor;
}

export default EditorCreator;
