import React, { useEffect, useRef, useState } from 'react';
import { PROFILE_GALLERY } from 'constants/routes/artist-profile';
import cx from 'classnames';
import styles from './basic-dropdown.module.scss';
import { useLocation } from 'react-router';

const getOffset = (target, prop, value = 0) => {
  const offset = target[prop];
  const { offsetParent } = target;

  if (!offsetParent) {
    return offset + value;
  }

  return value + getOffset(offsetParent, prop, offset);
};

const getPositionStyle = styles => {
  return (
    Object.keys(styles)
      .map(
        key =>
          `${key}: ${styles[key]}${typeof styles[key] === 'number' ? 'px' : ''}`
      )
      .join('; ') + ';'
  );
};

const calculatePosition = (target, dropdown) => {
  const offsetLeft = getOffset(target, 'offsetLeft', 0);
  const { innerWidth } = window;
  const { offsetWidth } = dropdown;
  const bodyPadding = 20;

  return {
    left: Math.min(innerWidth - (offsetLeft + offsetWidth + bodyPadding), 0),
    display: 'block',
    position: 'absolute',
  };
};

const initMouseOver = (targetRef, dropdownRef, setOpen) => {
  const handleMouseOver = () => setOpen(true);
  const handleMouseLeave = () => setOpen(false);
  const clickHandler = () => setOpen(false);

  if (targetRef && dropdownRef) {
    const targetNode = targetRef.current;
    const dropDownNode = dropdownRef.current;

    targetNode.addEventListener('mouseover', handleMouseOver, false);
    dropDownNode.addEventListener('mouseleave', handleMouseLeave, false);
    document.addEventListener('click', clickHandler);

    return () => {
      targetNode.removeEventListener('mouseover', handleMouseOver, false);
      dropDownNode.removeEventListener('mouseleave', handleMouseLeave, false);
      document.removeEventListener('click', clickHandler);
    };
  }
};

const initClick = (targetRef, dropdownRef, setOpen, open) => {
  const handleClick = () => setOpen(!open);
  const clickHandler = () => setOpen(false);

  if (targetRef && dropdownRef) {
    const targetNode = targetRef.current;
    const dropdownNode = dropdownRef.current;

    targetNode.addEventListener('click', handleClick);
    dropdownNode.addEventListener('click', handleClick);
    if (open) {
      document.addEventListener('click', clickHandler);
    }

    return () => {
      targetNode.removeEventListener('click', handleClick);
      dropdownNode.removeEventListener('click', handleClick);
      document.removeEventListener('click', clickHandler);
    };
  }
};

function BasicDropDown({
  children: targetElement,
  content,
  useClick,
  onOpen = () => {},
  onClose = () => {},
}) {
  const targetRef = useRef(null);
  const dropdownRef = useRef(null);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== PROFILE_GALLERY) {
      setOpen(false);
    }
  }, [setOpen, location.pathname]);

  useEffect(() => {
    if (!content) {
      return;
    }

    if (!useClick) {
      return initMouseOver(targetRef, dropdownRef, setOpen);
    }

    return initClick(targetRef, dropdownRef, setOpen, open);
  }, [targetRef, content, useClick, open]);

  useEffect(() => {
    open ? onOpen() : onClose();
  }, [open, onOpen, onClose]);

  useEffect(() => {
    const node = targetRef.current;
    const dropdown = dropdownRef.current;

    if (node && dropdown) {
      const onResize = () =>
        dropdown.setAttribute(
          'style',
          getPositionStyle(calculatePosition(node, dropdown))
        );
      window.addEventListener('resize', onResize);
      window.requestAnimationFrame(onResize);

      return () => {
        window.removeEventListener('resize', onResize);
      };
    }
  }, [targetRef, dropdownRef]);

  return (
    <div className={cx(styles.wrapper)}>
      <div ref={targetRef}>{targetElement}</div>
      <div
        ref={dropdownRef}
        className={cx(styles.dropdown, {
          [styles.show]: open,
        })}
      >
        {content}
      </div>
    </div>
  );
}

export default BasicDropDown;
