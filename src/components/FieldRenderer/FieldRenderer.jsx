import React from 'react';
import './FieldRenderer.css';

const FieldRenderer = ({ field, value, onChange }) => {
  const handleChange = (e) => {
    const newValue = e.target.value;
    onChange(newValue);
  };

  const handleTagsChange = (e) => {
    const tagsString = e.target.value;
    const tagsArray = tagsString.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
    onChange(tagsArray);
  };

  const formatValue = (value, type) => {
    if (value === null || value === undefined) return '';
    
    switch (type) {
      case 'date':
        if (value) {
          const date = new Date(value);
          return date.toLocaleDateString();
        }
        return '';
      case 'tags':
        return Array.isArray(value) ? value.join(', ') : '';
      case 'select':
        if (field.options) {
          const option = field.options.find(opt => opt.value === value);
          return option ? option.label : value;
        }
        return value;
      default:
        return value.toString();
    }
  };

  const renderField = () => {
    switch (field.type) {
      case 'text':
      case 'email':
      case 'phone':
        return (
          <input
            type={field.type}
            id={field.id}
            value={value || ''}
            onChange={handleChange}
            placeholder={field.placeholder}
            required={field.required}
            className="field-input"
          />
        );
      
      case 'date':
        return (
          <input
            type="date"
            id={field.id}
            value={value || ''}
            onChange={handleChange}
            required={field.required}
            className="field-input"
          />
        );
      
      case 'select':
        return (
          <select
            id={field.id}
            value={value || ''}
            onChange={handleChange}
            required={field.required}
            className="field-select"
          >
            <option value="">Select...</option>
            {field.options?.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      
      case 'textarea':
        return (
          <textarea
            id={field.id}
            value={value || ''}
            onChange={handleChange}
            placeholder={field.placeholder}
            required={field.required}
            rows={field.rows || 3}
            className="field-textarea"
          />
        );
      
      case 'tags':
        return (
          <input
            type="text"
            id={field.id}
            value={Array.isArray(value) ? value.join(', ') : value || ''}
            onChange={handleTagsChange}
            placeholder={field.placeholder}
            className="field-input field-tags"
          />
        );
      
      default:
        return (
          <div className="field-display">
            {formatValue(value, field.type)}
          </div>
        );
    }
  };

  return (
    <div className="field-wrapper">
      <label htmlFor={field.id} className="field-label">
        {field.label}
        {field.required && <span className="required-indicator">*</span>}
      </label>
      {renderField()}
      {field.type === 'tags' && (
        <small className="field-hint">Separate tags with commas</small>
      )}
    </div>
  );
};

export default FieldRenderer;