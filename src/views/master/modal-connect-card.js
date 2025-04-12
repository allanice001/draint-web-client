import './modal.scss';

import { Card, CardActions, CardContent, Switch } from '@material-ui/core';

import React from 'react';

const ModalContentCard = ({ isInList, handleSwitchChange, image }) => {
  const toggleChecked = ContentMediaId => {
    handleSwitchChange(ContentMediaId, isInList);
  };
  return (
    <Card>
      <CardContent>
        <img
          alt={image.id}
          className="image-content"
          src={image.content_media_url}
          title={image.id}
          width="200"
          height="200"
        />
      </CardContent>
      <CardActions>
        <Switch
          checked={isInList}
          onChange={() => toggleChecked(image.id)}
          color="primary"
          name="checkedB"
          inputProps={{ 'aria-label': 'primary checkbox' }}
        />
      </CardActions>
    </Card>
  );
};

export default ModalContentCard;
