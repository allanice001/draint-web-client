import { List, Record } from '../shared/list';

import Icons from './index';
import styled from 'styled-components';

const Wrapper = styled.span`
  max-width: 30px;
  max-height: 30px;
  display: inline-block;
`;

const parseIcons = icons => {
  return Object.keys(icons).map(key => {
    const Icon = icons[key];

    return {
      Icon,
      name: key,
    };
  });
};

const IconsPreview = () => {
  return (
    <List>
      {parseIcons(Icons).map(({ name, Icon }) => (
        <Record>
          <Wrapper>
            <Icon width={24} height={24} /> <br /> {name}
          </Wrapper>
        </Record>
      ))}
    </List>
  );
};

export default IconsPreview;
