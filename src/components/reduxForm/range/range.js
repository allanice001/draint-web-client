import React, { useCallback, useEffect, useState } from 'react';

import Input from '../input/input';
import { MAX_ARTWORK_PRICE } from 'constants/global';
import Slider from '@material-ui/core/Slider';
import styles from './range.module.scss';

const Range = ({
  input,
  label,
  maxValue: initMaxValue,
  minValue: initMinValue,
}) => {
  const [minValue, setMinValue] = useState(initMinValue || 0);
  const [maxValue, setMaxValue] = useState(initMaxValue || 0);
  const [errorMessage, setErrorMessage] = useState('');
  const [sliderTouched, setSliderTouched] = useState(false);

  const sendRequest = () => {
    if (errorMessage) return;

    input.onChange([minValue, maxValue]);
  };

  const handleMouseLeave = () => {
    if (sliderTouched) {
      sendRequest();
    }
  };

  const handleSliderChange = (e, [min, max]) => {
    setSliderTouched(true);
    setSliderValues(e, [min, max]);
  };

  const setSliderValues = useCallback((event, [newMinValue, newMaxValue]) => {
    setMaxValue(newMaxValue);
    setMinValue(newMinValue);
  }, []);

  useEffect(() => {
    let newMinValue = minValue;
    let newMaxValue = maxValue;

    if (initMinValue > minValue) {
      newMinValue = initMinValue;
    }

    if (initMaxValue > maxValue) {
      newMaxValue = initMaxValue;
    }

    setSliderValues(null, [newMinValue, newMaxValue]);
  }, [initMaxValue, initMinValue]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleInputChange = (setValueCallback, position) => event => {
    const value = Number(event.target.value);

    if (value >= 0 && value <= MAX_ARTWORK_PRICE * 10) {
      setValueCallback(value);
      const newValue = [minValue, maxValue];
      newValue[position] = Number(value);
      setSliderValues(null, newValue);
    }
  };

  useEffect(() => {
    if (maxValue > MAX_ARTWORK_PRICE || minValue > MAX_ARTWORK_PRICE)
      return setErrorMessage(`From 0 to ${Math.trunc(MAX_ARTWORK_PRICE)}`);

    if (minValue > maxValue)
      return setErrorMessage(
        `The minimum price is higher than the maximum price`
      );
    if (errorMessage) {
      setErrorMessage('');
    }
  }, [minValue, maxValue]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={styles.wrapper}>
      <label className={styles.label}>{label}</label>

      <Slider
        classes={{
          root: styles.root,
          thumb: styles.rangeDot,
        }}
        max={initMaxValue}
        min={initMinValue}
        onChange={handleSliderChange}
        onMouseUp={sendRequest}
        onChangeCommitted={handleMouseLeave}
        onTouchEnd={sendRequest}
        step={1}
        value={[minValue, maxValue]}
        defaultValue={input.value || [minValue, maxValue]}
      />

      <div className={styles.form}>
        <Input
          className={styles.input__wrapper}
          handleOnBlur={sendRequest}
          inputClassName={styles.input} // legacy
          label=" "
          name="from"
          onChange={handleInputChange(setMinValue, 0)}
          placeholder="From"
          value={minValue + ''}
          defaultValue={input.value ? input.value[0].toString() : '0'}
        />

        <span>to</span>

        <Input
          className={styles.input__wrapper}
          handleOnBlur={sendRequest}
          inputClassName={styles.input} // legacy
          label=" "
          name="to"
          onChange={handleInputChange(setMaxValue, 1)}
          placeholder="To"
          value={maxValue + ''}
          defaultValue={input.value ? input.value[1].toString() : '0'}
        />
      </div>

      {errorMessage && (
        <div className={styles.error_message__wrapper}>
          <span className={styles.error_message}>{errorMessage}</span>
        </div>
      )}
    </div>
  );
};

export default Range;
