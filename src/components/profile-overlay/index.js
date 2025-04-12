import { BackgroundUploader } from '../lib';
import React from 'react';
import styled from 'styled-components';

const Content = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
`;

const Wrapper = styled.div`
  overflow: hidden;
  background-color: #e0e0e0;
  background-image: url(${({ backgroundUrl }) => backgroundUrl});
  background-size: cover;
  background-position: center;
  padding-bottom: 65%;
  position: relative;
  margin: 0 auto;
`;

const Artwork = props => {
  const { scale, top, left, src } = props;

  const Size = styled.img`
    height: 100%;
    transform: scale(${scale / 100});
    transform-origin: center;
    boxshadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2),
      0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12);
  `;

  const Position = styled.div`
    transform: translateY(${top - 50}%) translateX(${left - 50}%);
    transform-origin: center;
    justify-content: center;
    align-items: center;
    display: flex;
    height: 100%;
    width: 100%;
  `;

  return (
    <Position left={left} top={top}>
      <Size src={src} scale={scale} alt="" />
    </Position>
  );
};

export class ProfileOverlay extends React.Component {
  render() {
    const {
      artworkUrl,
      scale,
      left,
      top,
      backgroundUrl,
      onClickHandler,
      loading,
      title,
    } = this.props;
    const artworkProps = {
      src: artworkUrl,
      scale,
      left,
      top,
    };
    return (
      <Wrapper backgroundUrl={backgroundUrl}>
        <Content>
          <Artwork {...artworkProps} />
        </Content>
        <BackgroundUploader
          onClickHandler={onClickHandler}
          loading={loading}
          title={title}
        />
      </Wrapper>
    );
  }
}
