import React from 'react';
import PropTypes from 'prop-types';
import './Card.css';

/**
 * Compound Card component with Header, Body, and Footer
 */
const Card = React.memo(({
  children,
  variant = 'default',
  elevation = 'medium',
  hoverable = false,
  className = '',
  onClick,
  ...rest
}) => {
  const cardClassName = [
    'card',
    `card--${variant}`,
    `card--${elevation}`,
    hoverable && 'card--hoverable',
    onClick && 'card--clickable',
    className
  ].filter(Boolean).join(' ');

  return (
    <div
      className={cardClassName}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(e);
        }
      } : undefined}
      {...rest}
    >
      {children}
    </div>
  );
});

// Card Header component
const CardHeader = React.memo(({
  children,
  title,
  subtitle,
  action,
  className = '',
  ...rest
}) => {
  return (
    <div className={`card__header ${className}`} {...rest}>
      {title || subtitle ? (
        <div className="card__header-content">
          {title && <h3 className="card__title">{title}</h3>}
          {subtitle && <p className="card__subtitle">{subtitle}</p>}
        </div>
      ) : (
        children
      )}
      {action && (
        <div className="card__header-action">
          {action}
        </div>
      )}
    </div>
  );
});

// Card Body component
const CardBody = React.memo(({
  children,
  className = '',
  padding = 'default',
  ...rest
}) => {
  const bodyClassName = [
    'card__body',
    `card__body--${padding}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={bodyClassName} {...rest}>
      {children}
    </div>
  );
});

// Card Footer component
const CardFooter = React.memo(({
  children,
  className = '',
  justify = 'flex-end',
  ...rest
}) => {
  const footerClassName = [
    'card__footer',
    `card__footer--${justify}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={footerClassName} {...rest}>
      {children}
    </div>
  );
});

// Attach sub-components
Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

Card.displayName = 'Card';
CardHeader.displayName = 'Card.Header';
CardBody.displayName = 'Card.Body';
CardFooter.displayName = 'Card.Footer';

// PropTypes
Card.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['default', 'outlined', 'filled']),
  elevation: PropTypes.oneOf(['none', 'low', 'medium', 'high']),
  hoverable: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func
};

CardHeader.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  action: PropTypes.node,
  className: PropTypes.string
};

CardBody.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  padding: PropTypes.oneOf(['none', 'small', 'default', 'large'])
};

CardFooter.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  justify: PropTypes.oneOf(['flex-start', 'center', 'flex-end', 'space-between'])
};

export default Card;