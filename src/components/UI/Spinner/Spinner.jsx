import React from 'react';
import PropTypes from 'prop-types';
import './Spinner.css';

/**
 * Reusable Spinner component for loading states
 */
const Spinner = React.memo(({
  size = 'medium',
  variant = 'primary',
  className = '',
  label = 'Loading...',
  overlay = false,
  ...rest
}) => {
  const spinnerClassName = [
    'spinner',
    `spinner--${size}`,
    `spinner--${variant}`,
    overlay && 'spinner--overlay',
    className
  ].filter(Boolean).join(' ');

  const SpinnerElement = (
    <div className={spinnerClassName} {...rest}>
      <svg 
        className="spinner__svg" 
        viewBox="0 0 50 50"
        aria-label={label}
        role="img"
      >
        <circle
          className="spinner__circle"
          cx="25"
          cy="25"
          r="20"
          fill="none"
          strokeWidth="4"
        />
      </svg>
      <span className="sr-only">{label}</span>
    </div>
  );

  if (overlay) {
    return (
      <div className="spinner-overlay">
        {SpinnerElement}
      </div>
    );
  }

  return SpinnerElement;
});

Spinner.displayName = 'Spinner';

Spinner.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  variant: PropTypes.oneOf(['primary', 'secondary', 'white']),
  className: PropTypes.string,
  label: PropTypes.string,
  overlay: PropTypes.bool
};

export default Spinner;