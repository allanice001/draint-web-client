import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import Checkbox from 'components/reduxForm/checkbox/checkbox';
import Input from 'components/reduxForm/input/input';
import { LETTERS_SPACES } from 'components/reduxForm/validators';
import classnames from 'classnames';
import styles from './dropdown.module.scss';
import { touch } from 'redux-form';
import { useDispatch } from 'react-redux';

const containe = (target = '', value = '') => {
  const check = LETTERS_SPACES.test(value);

  if (check) {
    return new RegExp(value.toLocaleLowerCase()).test(
      target.toLocaleLowerCase()
    );
  }

  return check;
};

const getItemClasses = checked =>
  classnames(styles.item, { [styles.checked]: checked });

const resetValues = values =>
  Array.from(values.keys()).forEach(key => values.set(key, false));

const getInitialValues = (initialValue, list) => {
  return list
    .filter(el => {
      if (Array.isArray(initialValue)) {
        return initialValue.includes(el.key);
      } else if (typeof initialValue === 'string') {
        return el.key === initialValue || el.label === initialValue;
      } else {
        return false;
      }
    })
    .map(el => [el.id, true]);
};

function Dropdown(props) {
  const {
    list = [],
    name,
    placeholder,
    onChange,
    input = {},
    value,
    labelClassName,
    label,
    meta,
    shadow,
    className,
    disabled,
    formName,
    required,
    single,
    max,
  } = props;
  const initialValue = useMemo(() => input.value || value || [], [
    input,
    value,
  ]);
  const listMap = new Map(list.map(el => [el.id, el]));
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const inputRef = useRef(null);

  const dispatch = useDispatch();
  const handleToched = () => {
    if (formName && input.name) {
      dispatch(touch(formName, [input.name]));
    }
  };

  const values = useMemo(() => new Map(getInitialValues(initialValue, list)), [
    initialValue,
    list,
  ]);

  const wrapperClasses = classnames(styles.wrapper, {
    [styles.shadow]: shadow,
  });

  const classNames = classnames(className, {
    [styles.required]: required,
  });

  const displayStyle = classnames(styles.display, {
    [styles._disabled]: disabled,
  });

  const parent = useRef();
  const getDisplayValues = values =>
    Array.from(values.entries())
      .filter(el => el[1])
      .map(el => listMap.get(el[0]).label);

  const clickHandler = useCallback(
    e => {
      if (open && !parent.current.contains(e.target)) {
        setSearchValue('');
        setOpen(false);
        inputRef.current.blur();
        inputRef.current.value = '';
      }
    },
    [open]
  );

  useEffect(() => {
    window.addEventListener('click', clickHandler);
    window.addEventListener('touchstart', clickHandler);

    return () => {
      window.removeEventListener('click', clickHandler);
      window.removeEventListener('touchstart', clickHandler);
    };
  }, [clickHandler, open]);

  const isDisabled = useCallback(
    id => {
      return (
        (max > 0 && values.size >= max && !values.get(id)) ||
        (single && values.get(id))
      );
    },
    [max, values, single]
  );

  return (
    <div className={classNames}>
      {label && (
        <label className={labelClassName || styles.label}>
          {label || <Nbsp />}
        </label>
      )}

      <div className={wrapperClasses} ref={parent}>
        <Input
          labelClassName={styles.inputLabel}
          name="search"
          onChange={e => setSearchValue(e.target.value)}
          onFocus={() => {
            handleToched();
            setOpen(true);
          }}
          disabled={disabled}
          placeholder={!open ? placeholder : ''}
          inputClassName={styles.input}
          handleRef={inputRef}
        />

        <div
          className={`${displayStyle} ${
            !open && initialValue.length ? styles.show : ''
          }`}
          onClick={disabled ? () => setOpen(false) : () => setOpen(true)}
        >
          {getDisplayValues(values).join(', ')}
        </div>

        {open && (
          <ul className={styles.list}>
            {list
              .filter(el => containe(el.label, searchValue))
              .map(el => (
                <li className={getItemClasses(el.checked)} key={el.id}>
                  <Checkbox
                    name={`${name}-${el.id}`}
                    className={styles.item__checkbox}
                    label={el.label}
                    value={values.get(el.id) || false}
                    disabled={isDisabled(el.id)}
                    hideCheckbox={single}
                    onChange={e => {
                      if (single) {
                        resetValues(values);
                      }

                      values.set(el.id, e.target.checked);
                      const change = onChange || input.onChange;
                      const val = new Map(
                        list.map(item => [item.id, item.key])
                      );
                      const v = Array.from(values.entries())
                        .filter(el => el[1])
                        .map(([id]) => val.get(id));

                      single ? change(v[0]) : change(v);
                      if (single) {
                        setOpen(false);
                      }
                    }}
                  />
                </li>
              ))}
          </ul>
        )}
      </div>
      {meta.touched && meta.invalid && (
        <span className={styles.error}>{meta.error}</span>
      )}
    </div>
  );
}

const Nbsp = () => <>&nbsp;</>;

export default Dropdown;
