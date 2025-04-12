/** *
 *
 *   LOADINGG BUTTON
 *   Button with loading animation for actions
 *   that will take some time to process.
 *
 *   PROPS
 *   text: button label
 *   action: callback function executed on click
 *   params: object passed to the callback function (optional)
 *   color: red/blue (default: green)
 *   loading: true/false to toggle the animation
 *   className: apply a custom css class (optional)
 *
 ********* */

import { Button } from 'components/lib';
import ClassNames from 'classnames';
import React from 'react';

export function LoadingButton(props) {
  const cssClass = ClassNames({
    'btn-loader': true,
    loading: props.loading,
    [props.color]: props.color,
    [props.className]: props.className,
  });

  return (
    <div className={cssClass}>
      <Button {...props} />
    </div>
  );
}
