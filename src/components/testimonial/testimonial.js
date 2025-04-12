/***
 *
 *   TESTIMONIAL
 *   Create a testimonial containing a quote, author image and name.
 *
 *   PROPS
 *   text: the quotation
 *   author: name of the author (optional)
 *   image - imported image object (optional)
 *
 **********/

import './testimonial.scss';

import { Image } from 'components/lib';
import React from 'react';

export class Testimonial extends React.Component {
  render() {
    return (
      <div className="testimonial">
        {this.props.image && (
          <Image
            src={this.props.image}
            alt={this.props.author && this.props.author}
          />
        )}

        <blockquote>
          "{this.props.text}"
          {this.props.author && <cite>– {this.props.author}</cite>}
        </blockquote>
      </div>
    );
  }
}
