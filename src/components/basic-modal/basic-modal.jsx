import React, { useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import Icons from 'components/icons';
import styles from './basic-modal.module.scss';
import { updateClassList } from 'helpers/utils';

function DefaultModal({
  isOpen = false,
  title,
  handleClose,
  children,
  footer,
  footerClassName = '',
  className,
  multi,
  modalsCount,
  activeIndex,
  onNext,
  onPrev,
  maxWidth = 'md',
  hasCloseIcon = true,
  customWidth,
  titleCenter,
  fullScreen,
}) {
  useEffect(() => {
    if (isOpen) {
      updateClassList('add', { el: document.body, className: 'overlay' });
    }
  }, [isOpen]);

  function setFullScreenModal() {
    if (!fullScreen) {
      return {
        root: styles.dialog,
        paper: styles.paper,
        container: styles.backdrop,
        paperWidthMd: customWidth,
      };
    }

    return {};
  }

  return (
    <Dialog
      onClose={handleClose}
      onExited={() =>
        updateClassList('remove', { el: document.body, className: 'overlay' })
      }
      open={!!isOpen}
      maxWidth={maxWidth}
      classes={setFullScreenModal()}
      fullScreen={fullScreen}
    >
      {multi && (
        <>
          <div className={styles.arrows}>
            <button
              type="button"
              className={`${styles.arrow} ${styles.left}`}
              onClick={onPrev}
              disabled={activeIndex === 0}
            >
              <Icons.Arrow />
            </button>
            <button
              type="button"
              className={`${styles.arrow} ${styles.right}`}
              onClick={onNext}
              disabled={activeIndex === modalsCount - 1}
            >
              <Icons.Arrow />
            </button>
          </div>
          <div className={styles.dots_wrapper}>
            <button
              type="button"
              className={`${styles.arrow} ${styles.left}`}
              onClick={onPrev}
              disabled={activeIndex === 0}
            >
              <Icons.Arrow />
            </button>
            <div className={styles.dots}>
              {Array.from(new Array(modalsCount)).map((el, i) => (
                <div
                  className={`${styles.dot} ${
                    i === activeIndex ? styles.active : ''
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              className={`${styles.arrow} ${styles.right}`}
              onClick={onNext}
              disabled={activeIndex === modalsCount - 1}
            >
              <Icons.Arrow />
            </button>
          </div>
        </>
      )}
      <div className={styles.header}>
        <span className={titleCenter}>{title}</span>

        {hasCloseIcon && (
          <button type="button" className={styles.close} onClick={handleClose}>
            <Icons.Cancel className={styles.icon} />
          </button>
        )}
      </div>

      <div className={className || styles.body}>{children}</div>

      {footer && (
        <div className={`${styles.footer} ${footerClassName}`}>{footer}</div>
      )}
    </Dialog>
  );
}

export default DefaultModal;
