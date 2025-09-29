import React from 'react';
import PropTypes from 'prop-types';
import './Input.css';

/**
 * Reusable Input component with validation and accessibility
 */
const Input = React.memo(React.forwardRef((
  {
    type = 'text',
    label,
    placeholder,
    value,
    onChange,
    onBlur,
    onFocus,
    error,
    helperText,
    required = false,
    disabled = false,
    readOnly = false,
    autoComplete,
    autoFocus = false,
    maxLength,
    minLength,
    pattern,
    size = 'medium',
    variant = 'default',
    icon,
    iconPosition = 'left',
    clearable = false,
    className = '',
    id,
    name,
    ...rest
  },
  ref
) => {
  const inputId = id || name || `input-${Math.random().toString(36).substr(2, 9)}`;
  const [focused, setFocused] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const handleFocus = (event) => {
    setFocused(true);
    onFocus?.(event);
  };

  const handleBlur = (event) => {
    setFocused(false);
    onBlur?.(event);
  };

  const handleClear = () => {
    const event = {
      target: { name, value: '' },
      type: 'change'
    };
    onChange?.(event);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const inputType = type === 'password' && showPassword ? 'text' : type;
  const hasError = Boolean(error);
  const hasValue = Boolean(value);

  const containerClassName = [
    'input-container',
    `input-container--${size}`,
    `input-container--${variant}`,
    focused && 'input-container--focused',
    hasError && 'input-container--error',
    disabled && 'input-container--disabled',
    readOnly && 'input-container--readonly',
    className
  ].filter(Boolean).join(' ');

  const inputClassName = [
    'input',
    icon && `input--icon-${iconPosition}`,
    clearable && hasValue && 'input--clearable',
    type === 'password' && 'input--password'
  ].filter(Boolean).join(' ');

  return (
    <div className={containerClassName}>
      {label && (
        <label htmlFor={inputId} className="input-label">
          {label}
          {required && <span className="input-required" aria-label="required">*</span>}
        </label>
      )}
      
      <div className="input-wrapper">
        {icon && iconPosition === 'left' && (
          <span className="input-icon input-icon--left" aria-hidden="true">
            {icon}
          </span>
        )}
        
        <input
          ref={ref}
          id={inputId}
          name={name}
          type={inputType}
          value={value || ''}
          placeholder={placeholder}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          required={required}
          disabled={disabled}
          readOnly={readOnly}
          autoComplete={autoComplete}
          autoFocus={autoFocus}
          maxLength={maxLength}
          minLength={minLength}
          pattern={pattern}
          className={inputClassName}
          aria-invalid={hasError}
          aria-describedby={
            [error && `${inputId}-error`, helperText && `${inputId}-help`]
              .filter(Boolean)
              .join(' ') || undefined
          }
          {...rest}
        />
        
        {type === 'password' && (
          <button
            type="button"
            className="input-action input-action--password"
            onClick={togglePasswordVisibility}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            tabIndex={-1}
          >
            {showPassword ? '🙈' : '👁️'}
          </button>
        )}
        
        {clearable && hasValue && !disabled && !readOnly && (
          <button
            type="button"
            className="input-action input-action--clear"
            onClick={handleClear}
            aria-label="Clear input"
            tabIndex={-1}
          >
            ✕
          </button>
        )}
        
        {icon && iconPosition === 'right' && (
          <span className="input-icon input-icon--right" aria-hidden="true">
            {icon}
          </span>
        )}
      </div>
      
      {error && (
        <div id={`${inputId}-error`} className="input-error" role="alert">
          {error}
        </div>
      )}
      
      {helperText && !error && (
        <div id={`${inputId}-help`} className="input-helper">
          {helperText}
        </div>
      )}
    </div>
  );
}));

Input.displayName = 'Input';

Input.propTypes = {
  type: PropTypes.oneOf([
    'text', 'email', 'password', 'number', 'tel', 'url', 'search', 'date', 'time'
  ]),
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  error: PropTypes.string,
  helperText: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  autoComplete: PropTypes.string,
  autoFocus: PropTypes.bool,
  maxLength: PropTypes.number,
  minLength: PropTypes.number,
  pattern: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  variant: PropTypes.oneOf(['default', 'filled', 'outlined']),
  icon: PropTypes.node,
  iconPosition: PropTypes.oneOf(['left', 'right']),
  clearable: PropTypes.bool,
  className: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string
};

export default Input;