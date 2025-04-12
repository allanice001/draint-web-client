/***
 *
 *   SOCIAL SHARING BUTTONS
 *   A sharing wiget for Facebook, Twitter, Linkedin and email.
 *
 *   PROPS
 *   url: url of page to share
 *   description: text for the socal media post.
 *
 **********/

import './social.scss';

import { Icon } from 'components/lib';
import React from 'react';

export class Social extends React.Component {
  render() {
    return (
      <ul className="social-buttons">
        <li className="facebook">
          <Icon color="light" image="facebook" />
          <a href={'http://www.facebook.com/share.php?u=' + this.props.url}>
            Share on Facebook
          </a>
        </li>

        <li className="twitter">
          <Icon color="light" image="twitter" />
          <a
            href={
              'https://twitter.com/intent/tweet?original_referer=&amp;text=' +
              this.props.description +
              ':%20' +
              this.props.url
            }
          >
            Share this on Twitter
          </a>
        </li>

        <li className="linkedin">
          <Icon color="light" image="linkedin" />
          <a
            href={
              'http://www.linkedin.com/shareArticle?mini=true&url=' +
              this.props.url +
              '&title=' +
              this.props.description
            }
          >
            Share this on LinkedIn
          </a>
        </li>

        <li className="mail">
          <Icon color="light" image="mail" />
          <a
            href={
              'mailto:?subject=You must see this!&body=' +
              this.props.description +
              '%0D%0A%0D%0A' +
              this.props.url
            }
          >
            Email to a friend
          </a>
        </li>
      </ul>
    );
  }
}
