import React from 'react';
// import Card from '@material-ui/core/Card';
// import CardMedia from '@material-ui/core/CardMedia';
import styles from './avatar.module.scss';

export function ArtistAvatar(props) {
  // function checkBackground(image) {
  //   if (!image) return false;
  //   const extensionsClause = image.includes('.jpg') || image.includes('.jpeg') || image.includes('.png');
  //   const bucketsClause = image.includes('theme') || image.includes('background');
  //   return extensionsClause || bucketsClause;
  // }

  const { themeData } = props;
  const image = themeData.theme ? themeData.theme : themeData.avatar;
  // return (
  //   <Card className="artist-photo-container">
  //     <CardMedia>
  //       <div className="artist-photo-wrapper">
  //         {checkBackground(image) && (
  //           <img src={image} alt="artist" className="artist-photo" title="artist-photo" />
  //         )}
  //         {!checkBackground(image) && <div className="artist-photo-placeholder" />}
  //       </div>
  //     </CardMedia>
  //   </Card>
  // );

  return (
    <div className={styles.row}>
      <div />
      <img alt="Artist's proto" src={image} title="Artist's photo" />
    </div>
  );
}
