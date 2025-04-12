import React from 'react';

export const RoleItem = props => {

  const { item, icon, classBlock, classIcon, classTitle, classDescription, onClick } = props;

  return (
    <li key={item.id} className={classBlock} onClick={onClick}>
      <div className={classIcon}>{icon}</div>
      <div>
        <span className={classTitle}>{item.title}</span>
        <p className={classDescription}>{item.description}</p>
      </div>
    </li>
  );
};
