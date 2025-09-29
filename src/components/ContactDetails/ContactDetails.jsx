import React, { useState } from 'react';
import './ContactDetails.css';
import FieldRenderer from '../FieldRenderer/FieldRenderer';

const ContactDetails = ({ fieldsConfig, contactData }) => {
  const [expandedFolders, setExpandedFolders] = useState(
    fieldsConfig.folders.reduce((acc, folder) => {
      acc[folder.id] = folder.expanded;
      return acc;
    }, {})
  );

  const toggleFolder = (folderId) => {
    setExpandedFolders(prev => ({
      ...prev,
      [folderId]: !prev[folderId]
    }));
  };

  const getIconSymbol = (iconType) => {
    const icons = {
      person: '👤',
      business: '🏢',
      location: '📍',
      info: 'ℹ️'
    };
    return icons[iconType] || '📄';
  };

  const getInitials = (firstName, lastName) => {
    return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase();
  };

  return (
    <div className="contact-details">
      {/* Contact Header */}
      <div className="contact-header">
        <div className="contact-avatar">
          {contactData.avatar ? (
            <img src={contactData.avatar} alt={`${contactData.firstName} ${contactData.lastName}`} />
          ) : (
            <div className="avatar-placeholder">
              {getInitials(contactData.firstName, contactData.lastName)}
            </div>
          )}
        </div>
        <div className="contact-info">
          <h1 className="contact-name">
            {contactData.firstName} {contactData.lastName}
          </h1>
          <p className="contact-title">{contactData.jobTitle}</p>
          <p className="contact-company">{contactData.company}</p>
          <div className="contact-tags">
            {contactData.tags?.map((tag, index) => (
              <span key={index} className={`tag tag-${tag.toLowerCase().replace(' ', '-')}`}>
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="contact-status">
          <span className={`status-badge status-${contactData.status}`}>
            {contactData.status}
          </span>
          <div className="contact-meta">
            <small>Last Contact: {contactData.lastContact}</small>
            <small>Next Follow-up: {contactData.nextFollowUp}</small>
          </div>
        </div>
      </div>

      {/* Dynamic Fields */}
      <div className="contact-fields">
        {fieldsConfig.folders
          .sort((a, b) => a.order - b.order)
          .map(folder => (
            <div key={folder.id} className="folder-section">
              <div 
                className="folder-header"
                onClick={() => toggleFolder(folder.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    toggleFolder(folder.id);
                  }
                }}
              >
                <div className="folder-title">
                  <span className="folder-icon">{getIconSymbol(folder.icon)}</span>
                  <span className="folder-name">{folder.name}</span>
                </div>
                <span className={`folder-toggle ${expandedFolders[folder.id] ? 'expanded' : ''}`}>
                  ▼
                </span>
              </div>
              
              {expandedFolders[folder.id] && (
                <div className="folder-content">
                  <div className="field-grid">
                    {folder.fields.map(field => (
                      <FieldRenderer
                        key={field.id}
                        field={field}
                        value={contactData[field.id]}
                        onChange={(value) => console.log(`${field.id} changed to:`, value)}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default ContactDetails;