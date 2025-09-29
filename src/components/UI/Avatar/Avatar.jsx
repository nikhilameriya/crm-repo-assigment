import React from 'react';
import PropTypes from 'prop-types';
import './Avatar.css';
import { useLazyLoad } from '../../../hooks/useIntersection';

/**
 * Reusable Avatar component with lazy loading and fallbacks
 */
const Avatar = React.memo(({
  src,
  alt,
  name,
  size = 'medium',
  variant = 'circular',
  fallbackType = 'initials',
  className = '',
  loading = 'lazy',
  onClick,
  ...rest
}) => {
  const { ref, loaded, error } = useLazyLoad(loading === 'lazy' ? src : null);
  const shouldShowImage = (loading === 'eager' || loaded) && src && !error;

  const getInitials = (name) => {
    if (!name) return '?';
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const avatarClassName = [
    'avatar',
    `avatar--${size}`,
    `avatar--${variant}`,
    onClick && 'avatar--clickable',
    className
  ].filter(Boolean).join(' ');

  const handleClick = (event) => {
    onClick?.(event);
  };

  const handleKeyDown = (event) => {
    if (onClick && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      onClick(event);
    }
  };

  return (
    <div
      ref={loading === 'lazy' ? ref : undefined}
      className={avatarClassName}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      {...rest}
    >
      {shouldShowImage ? (
        <img
          src={src}
          alt={alt || name || 'Avatar'}
          className="avatar__image"
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
      ) : (
        <div className="avatar__fallback">
          {fallbackType === 'initials' ? (
            <span className="avatar__initials">
              {getInitials(name || alt)}
            </span>
          ) : (
            <svg className="avatar__icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          )}
        </div>
      )}
      
      {/* Status indicator */}
      {rest.status && (
        <div className={`avatar__status avatar__status--${rest.status}`} />
      )}
    </div>
  );
});

Avatar.displayName = 'Avatar';

Avatar.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  name: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large', 'xlarge']),
  variant: PropTypes.oneOf(['circular', 'rounded', 'square']),
  fallbackType: PropTypes.oneOf(['initials', 'icon']),
  className: PropTypes.string,
  loading: PropTypes.oneOf(['lazy', 'eager']),
  onClick: PropTypes.func,
  status: PropTypes.oneOf(['online', 'offline', 'away', 'busy'])
};

export default Avatar;