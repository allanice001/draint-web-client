/* eslint-disable no-unused-expressions */

const defaults = {
  host: 'https://www.instagram.com/',
  username: '',
  tag: '',
  container: '',
  display_profile: true,
  display_biography: true,
  display_website: false,
  display_gallery: true,
  display_igtv: false,
  get_data: false,
  callback: null,
  styling: true,
  link_validation: false,
  placeholder: null,
  items: 8,
  items_per_row: 4,
  margin: 0.5,
  image_size: 640,
};

const alert_validation_massage = 'This user didn\'t provide link to Draint artist profile in Instagram';
const alert_dataNull_massage = 'Incorrect Instagram link';

const image_sizes = {
  150: 0,
  240: 1,
  320: 2,
  480: 3,
  640: 4,
};

const escape_map = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '/': '&#x2F;',
  '`': '&#x60;',
  '=': '&#x3D;',
};
function escape_string(str) {
  return str.replace(/[&<>"'`=/]/g, char => escape_map[char]);
}

export default function feed (opts) {
  this.options = Object.assign({}, defaults);
  this.options = Object.assign(this.options, opts);
  this.is_tag = this.options.username === '';

  this.valid = true;
  if (this.options.username === '' && this.options.tag === '') {
    console.error('InstagramFeed: Error, no username or tag defined.');
    this.valid = false;
  } else if (!this.options.get_data && this.options.container === '') {
    console.error('InstagramFeed: Error, no container found.');
    this.valid = false;
  } else if (this.options.get_data && typeof this.options.callback !== 'function') {
    console.error('InstagramFeed: Error, invalid or undefined callback for get_data');
    this.valid = false;
  }

  this.get = (callback) => {
    const errorHandler = (massage, container) => {
      const html = '';
      // html = `<div id="insta-error"><span>${massage}</span></div>`;
      if (container) {
        container.innerHTML = html;
        console.log(massage);
      }
    };
    const url = this.is_tag
      ? `${this.options.host}explore/tags/${this.options.tag}`
      : this.options.host + this.options.username;
    const xhr = new XMLHttpRequest();

    const thisVar = this;
    xhr.onload = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          let data = xhr.responseText.split('window._sharedData = ')[1].split('</script>')[0];
          data = JSON.parse(data.substr(0, data.length - 1));
          data = data.entry_data.ProfilePage || data.entry_data.TagPage || null;
          if (data === null) {
            console.log(`InstagramFeed:${url}`);
            console.error(`InstagramFeed: Request error. No data retrieved: ${xhr.statusText}`);
            errorHandler('No open profile was found', thisVar.container);
          } else {
            data = data[0].graphql.user || data[0].graphql.hashtag;
            callback(data, thisVar);
          }
        } else {
          console.error(`InstagramFeed: Request error. Response: ${xhr.statusText}`);
          errorHandler('No open profile was found', thisVar.options.container);
          console.log(`InstagramFeed: Request error. Response: ${xhr.statusText}`);
          callback('error', thisVar);
        }
      }
    };
    xhr.open('GET', url, true);
    xhr.send();
  };

  this.parse_caption = (igobj, data) => {
    if (
      typeof igobj.node.edge_media_to_caption.edges[0] !== 'undefined'
            && typeof igobj.node.edge_media_to_caption.edges[0].node !== 'undefined'
            && typeof igobj.node.edge_media_to_caption.edges[0].node.text !== 'undefined'
            && igobj.node.edge_media_to_caption.edges[0].node.text !== null
    ) {
      return igobj.node.edge_media_to_caption.edges[0].node.text;
    }

    if (
      typeof igobj.node.title !== 'undefined'
            && igobj.node.title !== null
            && igobj.node.title.length !== 0
    ) {
      return igobj.node.title;
    }

    if (
      typeof igobj.node.accessibility_caption !== 'undefined'
            && igobj.node.accessibility_caption !== null
            && igobj.node.accessibility_caption.length !== 0
    ) {
      return igobj.node.accessibility_caption;
    }
    return `${this.is_tag ? data.name : data.username} image `;
  };

  this.display = (data) => {
    // Styling
    let styles;
    if (this.options.styling) {
      const width = (97 - this.options.margin * 2 * this.options.items_per_row) / this.options.items_per_row;
      styles = {
        profile_container: " style='display: flex; flex-direction: column; align-items: center; '",
        profile_image: " style='border-radius:10em;width:15%;max-width:125px;min-width:50px;'",
        profile_name: " style='font-size:1.2em;'",
        profile_biography: " style='font-size:1em;'",

        gallery_image: ` style='border-radius:15px;margin:${this.options.margin}% 
        ${this.options.margin}%;width:${width}%;float:left;'`,
      };
    } else {
      styles = {
        profile_container: '',
        profile_image: '',
        profile_name: '',
        profile_biography: '',
        gallery_image: '',
      };
    }

    // Profile
    let html = '';
    if (this.options.display_profile) {
      html += `<div class='instagram_profile'${styles.profile_container}>`;
      html += `<img class='instagram_profile_image ' src='${data.profile_pic_url}' alt='${this.is_tag
        ? `${data.name} tag pic`
        : `${data.username} profile pic`} profile pic' ${styles.profile_image}/>`;
      if (this.is_tag) {
        html += `
          <p class='instagram_tag'${styles.profile_name}>
            <a
              href='https://www.instagram.com/explore/tags/${this.options.tag}'
              rel='noopener' target='_blank'
            >
              #${this.options.tag}
            </a>
          </p>`;
      } else {
        html += `
          <p class='instagram_username'${styles.profile_name}>@${data.full_name}
           (<a href='https://www.instagram.com/${this.options.username}' rel='noopener' target='_blank'>
              @${this.options.username}
           </a>)
          </p>`;
      }

      if (!this.is_tag && this.options.display_website) {
        html += `
          <a href='${data.external_url}' class='instagram_biography'${styles.profile_biography}>
            ${data.external_url}
          </a>`;
      }

      if (!this.is_tag && this.options.display_biography) {
        html += `<p class='instagram_biography'${styles.profile_biography}>${data.biography}</p>`;
      }

      html += '</div>';
    }

    if (data === 'error') {
      this.options.placeholder
        ? this.options.container.appendChild(this.options.placeholder)
        : this.options.container.innerHTML = `<h2 ${styles.profile_container} > ${alert_dataNull_massage} </h2>`;
      return this.options.container.innerHTML;
    }

    if (this.options.link_validation) {
      const validation = data.external_url && data.external_url.includes('draint.art/artist');
      if (!validation) {
        this.options.placeholder
          ? this.options.container.appendChild(this.options.placeholder)
          : this.options.container.innerHTML = `<h2 ${styles.profile_container} > ${alert_validation_massage} </h2>`;
        return this.options.container.innerHTML;
      }
    }


    // Gallery
    if (this.options.display_gallery) {
      const image_index = typeof image_sizes[this.options.image_size] !== 'undefined'
        ? image_sizes[this.options.image_size]
        : image_sizes[640];

      if (typeof data.is_private !== 'undefined' && data.is_private === true) {
        html += "<p class='instagram_private'><strong>This profile is private</strong></p>";
      } else {
        const imgs = (data.edge_owner_to_timeline_media || data.edge_hashtag_to_media).edges;
        const max = (imgs.length > this.options.items) ? this.options.items : imgs.length;

        html += "<div class='instagram_gallery'>";

        for (let i = 0; i < max; i++) {
          const url = `https://www.instagram.com/p/${imgs[i].node.shortcode}`;
          let image; let type_resource;
          const caption = escape_string(this.parse_caption(imgs[i], data));

          // eslint-disable-next-line no-underscore-dangle
          switch (imgs[i].node.__typename) {
            case 'GraphSidecar':
              type_resource = 'sidecar';
              image = imgs[i].node.thumbnail_resources[image_index].src;
              break;
            case 'GraphVideo':
              type_resource = 'video';
              image = imgs[i].node.thumbnail_src;
              break;
            default:
              type_resource = 'image';
              image = imgs[i].node.thumbnail_resources[image_index].src;
          }

          if (this.is_tag) data.username = '';
          html += `<a href='${url}' 
            class='instagram-${type_resource}' 
            title='${caption}' 
            rel='noopener' 
            target='_blank'
          >`;
          html += `<img src='${image}' alt='${caption}'${styles.gallery_image} />`;
          html += '</a>';
        }

        html += '</div>';
      }
    }

    // IGTV
    if (this.options.display_igtv && typeof data.edge_felix_video_timeline !== 'undefined') {
      const igtv = data.edge_felix_video_timeline.edges;
      const max = (igtv.length > this.options.items) ? this.options.items : igtv.length;
      if (igtv.length > 0) {
        html += "<div class='instagram_igtv'>";
        for (let i = 0; i < max; i++) {
          const url = `https://www.instagram.com/p/${igtv[i].node.shortcode}`;
          const caption = this.parse_caption(igtv[i], data);

          html += `<a href='${url}' rel='noopener' title='${caption}' target='_blank'>`;
          html += `<img src='${igtv[i].node.thumbnail_src}' alt='${caption}'${styles.gallery_image} />`;
          html += '</a>';
        }
        html += '</div>';
      }
    }
    if (this.options.container) {
      this.options.container.innerHTML = html;
    }
  };

  this.run = () => {
    this.get((data, instance) => {
      if (instance.options.get_data) instance.options.callback(data);
      else instance.display(data);
      instance.options.loading && instance.options.loading();
    });
  };

  if (this.valid) {
    this.run();
  }
}

