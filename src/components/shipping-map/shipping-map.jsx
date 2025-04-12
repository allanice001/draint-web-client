import React, {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import useTheme, { useCollectorTheme } from 'hooks/use-theme';
import ArrowIcon from 'components/icons/dropdown-arrow';
import Icons from 'components/icons';
import cx from 'classnames';
import styles from './shipping-map.module.scss';

export const Key = {
  // Placed: 1,
  Confirmed: 2,
  Paid: 3,
  Certificate: 4,
  Wrapped: 5,
  Pickup: 6,
  CourierArrival: 7,
  Delivered: 8,
};

const steps = [
  // {
  //   key: Key.Placed,
  //   Icon: Icons.Offer,
  //   label: 'Order Placed',
  //   date: '',
  // },
  {
    key: Key.Confirmed,
    Icon: Icons.HandUp,
    label: 'Seller confirmed',
    date: '',
    status: true,
    position: {
      top: '-3px',
      left: '0px',
    },
  },
  {
    key: Key.Paid,
    Icon: Icons.CreditCard,

    position: {
      top: '2px',
      left: '2px',
    },

    label: 'Payment confirmed',
    date: '',
    status: true,
  },
  {
    key: Key.Certificate,
    Icon: Icons.Certificate,
    label: 'Certificate',
    date: '',
    status: true,
  },
  {
    key: Key.Wrapped,
    Icon: Icons.DashboardOrders,
    label: 'Wrapped',
    date: '',
    status: true,
  },
  {
    key: Key.Pickup,
    Icon: Icons.Pickup,
    label: 'Pickup scheduled',
    date: '',
    status: true,
  },
  {
    key: Key.CourierArrival,
    Icon: Icons.Track,
    label: 'Courier arrival',
    date: '',
    status: true,
  },
  {
    key: Key.Delivered,
    Icon: Icons.Check,
    label: 'Artwork delivered',
    date: '',
    status: true,
  },
];

const Step = forwardRef(
  (
    { Icon, label = '', date = '', first = false, status, position = {} },
    ref
  ) => {
    const stepClasses = cx(styles.step, {
      [styles.completed]: date,
      [styles.declined]: status === false,
    });
    const delimeterClasses = cx(styles.delimeter, {
      [styles.completed]: date,
    });
    const labelClasses = cx(styles.label, {
      [styles.completed]: date,
      [styles.declined]: status === false,
    });

    function getValue() {
      const res = date.split(' ');

      if (res.length === 2) {
        return (
          <span>
            {res[0]} <pre /> {res[1]}
          </span>
        );
      }

      return date;
    }

    return (
      <>
        {!first && (
          <div className={delimeterClasses}>
            <span />
            <span />
            <span />
          </div>
        )}

        <div ref={ref} className={stepClasses}>
          <div className={styles.icon__wrapper}>
            <Icon className={styles.icon} style={position} />
          </div>
          <div className={styles.content}>
            <h4 className={labelClasses}>{label}</h4>
            <time className={styles.time} dateTime={date.toString()}>
              {getValue()}
            </time>
          </div>
        </div>
      </>
    );
  }
);

function ShippingMap({ className = '', data = {} }) {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [hasCollapse, setHasCollapse] = useState(false);
  const itemRef = useRef(null);
  const containerRef = useRef(null);
  const { isMobile } = useTheme();

  const toggleCollapse = useCallback(() => {
    setIsCollapsed(!isCollapsed);
  }, [isCollapsed, setIsCollapsed]);

  const stepsView = useMemo(() => {
    const list = steps.map((el, index) => {
      const value = data[el.key];
      const date = typeof value === 'string' ? value : data[el.key].date;

      return {
        ...el,
        index,
        first: index === 0,
        date,
        status: data[el.key]?.status,
      };
    });

    const lastActiveStep = list.reduce((accumulator, currentValue) => {
      if (currentValue.date) {
        return currentValue.index;
      }

      return accumulator;
    }, 0);

    if (lastActiveStep + 1 < list.length - 1) {
      list[lastActiveStep + 1].ref = itemRef;
    } else {
      itemRef.current = null;
      setHasCollapse(false);
    }

    return list.map((el, i) => <Step ref={el.ref} {...el} />);
  }, [data]);

  const collpaseButton = useMemo(() => {
    if (!hasCollapse) {
      return null;
    }

    return (
      <div
        className={cx(styles.actions, {
          [styles.collapsed]: isCollapsed,
        })}
      >
        <button
          className={cx({
            [styles.collapsed]: isCollapsed,
          })}
          type="button"
          onClick={toggleCollapse}
        >
          <ArrowIcon />
        </button>
      </div>
    );
  }, [hasCollapse, isCollapsed, toggleCollapse]);

  useEffect(() => {
    if (itemRef.current) {
      setHasCollapse(true);

      if (isCollapsed && isMobile) {
        const top = itemRef.current.offsetTop;
        const height = itemRef.current.offsetHeight;

        containerRef.current.setAttribute('style', `height: ${top + height}px`);
      } else {
        if (isMobile) {
          containerRef.current.setAttribute(
            'style',
            `height: ${containerRef.current.scrollHeight}px`
          );
        } else {
          containerRef.current.setAttribute('style', `height: auto`);
        }
      }
    } else {
      containerRef.current.setAttribute('style', `height: auto`);
    }
  }, [data, itemRef, isCollapsed, isMobile]);

  useCollectorTheme(containerRef);

  return (
    <section className={cx(styles.map__wrapper, className)}>
      <div
        ref={containerRef}
        className={cx(styles.map, {
          [styles.collapsed]: isCollapsed,
        })}
      >
        {stepsView}
      </div>

      {collpaseButton}
    </section>
  );
}

export default ShippingMap;
