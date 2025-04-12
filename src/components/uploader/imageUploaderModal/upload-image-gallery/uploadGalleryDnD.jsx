import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { array, bool, func, object } from 'prop-types';

import { ArtworkService } from 'services/artwork-service.js';
import Icons from 'components/icons/index.js';
import React from 'react';
import cx from 'classnames';
import styles from './uploadGallery.module.scss';

const artworkService = new ArtworkService();

function reorder(list, startIndex, endIndex) {
  const result = [...list];
  const [removed] = result.splice(startIndex, 1);

  result.splice(endIndex, 0, removed);

  return result;
}

const DragDropGallery = function({
  images,
  additionalStyles,
  imageDeleteHandler,
  setActiveImage,
  activeImage,
  open,
  onDrag,
  onChange,
  isDisabled,
}) {
  function onDragEnd(result) {
    if (!result.destination) return;

    const items = reorder(
      images,
      result.source.index,
      result.destination.index
    );

    onDrag(items);
    onChange(items);
  }

  const imagesCount = images.length;
  const defaultCount = 8;
  const defaultArray = new Array(defaultCount).fill(false);
  const imagesPreview = imagesCount ? images : defaultArray;

  function wrapperClassName(isDraggingOver) {
    return cx(
      styles.gallery,
      additionalStyles?.upload_image__small_image_wrap,
      {
        [styles.gallery__notempty]: images.length,
        [styles.gallery__draggIn]: isDraggingOver,
      }
    );
  }

  function itemClassName(index, isDragging) {
    return cx(
      styles.gallery__item,
      additionalStyles?.upload_image__small_images,
      {
        [styles.activeImage]: activeImage === index,
        [styles['gallery__item--default']]:
          index === 0 && images.length > 0 && !isDragging,
        [styles['gallery__item--dragg']]: isDragging,
      }
    );
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable direction="horizontal" droppableId="droppable">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            className={wrapperClassName(snapshot.isDraggingOver)}
            {...provided.droppableProps}
          >
            {imagesPreview.map((element, index) => (
              <Draggable
                key={index}
                draggableId={`item-${index}`}
                index={index}
                isDragDisabled={isDisabled}
              >
                {(provided, snapshot) => (
                  <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    key={index}
                    ref={provided.innerRef}
                    className={itemClassName(index, snapshot.isDragging)}
                    onClick={() => setActiveImage(index)}
                  >
                    {element && (
                      <img
                        src={artworkService.filterArtworkSrc(element.imgPath)}
                        className={styles.img}
                        alt="Post"
                      />
                    )}

                    {element && (
                      <button
                        className={styles.delete}
                        onClick={event => {
                          event.stopPropagation();
                          imageDeleteHandler(index);
                        }}
                        type="button"
                      >
                        <Icons.Delete />
                      </button>
                    )}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
            {images.length > 0 && imagesPreview.length < defaultCount && (
              <button
                className={cx(
                  styles.gallery__item,
                  styles.add,
                  additionalStyles?.upload_image__small_images
                )}
                onClick={open}
                type="button"
              >
                <Icons.AddCircle />
              </button>
            )}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

DragDropGallery.propTypes = {
  images: array,
  additionalStyles: object.isRequired,
  imageDeleteHandler: func.isRequired,
  setActiveImage: func.isRequired,
  open: bool.isRequired,
  onChange: func.isRequired,
};

export default DragDropGallery;
