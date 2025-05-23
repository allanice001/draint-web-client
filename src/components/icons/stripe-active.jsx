import React from 'react';

export default function StripeActive(properties) {
  const { param: parameter } = properties;

  return (
    <svg
      height={parameter}
      preserveAspectRatio="xMidYMid"
      viewBox="0 0 256 256"
      width={parameter}
    >
      <defs>
        <linearGradient
          id="prefix__a_active"
          x1="100%"
          x2="0%"
          y1="58.356%"
          y2="0%"
        >
          <stop offset="0%" stopColor="#2697D4" />
          <stop offset="50%" stopColor="#207BCB" />
          <stop offset="100%" stopColor="#2285CE" />
        </linearGradient>
        <filter
          filterUnits="objectBoundingBox"
          height="200%"
          id="prefix__b_active"
          width="200%"
          x="-50%"
          y="-50%"
        >
          <feOffset
            dx={2}
            dy={2}
            in="SourceAlpha"
            result="shadowOffsetOuter1"
          />
          <feGaussianBlur
            in="shadowOffsetOuter1"
            result="shadowBlurOuter1"
            stdDeviation={3.5}
          />
          <feColorMatrix
            in="shadowBlurOuter1"
            result="shadowMatrixOuter1"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.185125113 0"
          />
          <feMerge>
            <feMergeNode in="shadowMatrixOuter1" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <path d="M0 0h256v256H0z" fill="url(#prefix__a_active)" />
      <path
        d="M139.688 111c-12.927-4.78-20.011-8.5-20.011-14.343 0-4.96 4.073-7.792 11.334-7.792 13.281 0 26.916 5.136 36.302 9.739l5.312-32.76c-7.438-3.542-22.667-9.385-43.74-9.385-14.874 0-27.27 3.895-36.124 11.156-9.21 7.614-13.99 18.594-13.99 31.875 0 24.083 14.698 34.354 38.604 43.031 15.406 5.49 20.542 9.386 20.542 15.406 0 5.844-4.96 9.208-13.99 9.208-11.157 0-29.572-5.489-41.615-12.572L77 187.677c10.27 5.844 29.395 11.864 49.23 11.864 15.76 0 28.864-3.718 37.718-10.801 9.916-7.792 15.052-19.302 15.052-34.177 0-24.615-15.052-34.886-39.313-43.562z"
        fill="#FFF"
        filter="url(#prefix__b_active)"
      />
    </svg>
  );
}
