import React from 'react';
import styles from './artwork-price-chart.module.scss';

function Chart({ fee, commissions, radius = 72, width = 30}) {
  const length = 2 * Math.PI * radius;
  const feeLength = (length / 100) * fee;
  const commissionsLength = (length / 100) * commissions;
  const center = 72 + 30 / 2;
  const diameter = (radius + width / 2) * 2;
  const commissionsStyle = {
    transformOrigin: 'center',
    transform: `rotate(${360 * (fee / 100)}deg)`,
  };

  return (
    <svg className={styles.chart__circle} width={diameter} height={diameter}>
      <circle
        stroke="#AC9EFF"
        strokeWidth={width}
        fill="none"
        cx={center}
        cy={center}
        r={radius}
      />
      <circle
        style={commissionsStyle}
        stroke="#4656C1"
        strokeWidth={width}
        strokeDasharray={`${commissionsLength} ,${length}`}
        strokeLinecap="round"
        fill="none"
        cx={center}
        cy={center}
        r={radius}
      />
      <circle
        stroke="#FF6BF9"
        strokeWidth={width}
        strokeDasharray={`${feeLength} ,${length}`}
        strokeLinecap="round"
        fill="none"
        cx={center}
        cy={center}
        r={radius}
      />
    </svg>
  );
}

export default Chart;
