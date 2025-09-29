import React from 'react';
import './Layout.css';
import ContactDetails from '../ContactDetails/ContactDetails';
import SectionRenderer from '../SectionRenderer/SectionRenderer';

const Layout = ({ layoutConfig, fieldsConfig, contactData }) => {
  if (!layoutConfig || !fieldsConfig || !contactData) {
    return <div className="layout-loading">Loading layout...</div>;
  }

  const { sections, layout } = layoutConfig;
  const { mainColumn, sideColumn } = layout;

  // Sort sections by order
  const sortedSections = sections.sort((a, b) => a.order - b.order).filter(section => section.visible);

  const renderSection = (sectionId) => {
    const section = sortedSections.find(s => s.id === sectionId);
    if (!section) return null;

    switch (section.type) {
      case 'contact-fields':
        return (
          <ContactDetails
            key={section.id}
            fieldsConfig={fieldsConfig}
            contactData={contactData.contact}
          />
        );
      case 'header':
        return (
          <div key={section.id} className="section-header">
            <h2>{section.title}</h2>
          </div>
        );
      default:
        return (
          <SectionRenderer
            key={section.id}
            section={section}
            data={contactData}
          />
        );
    }
  };

  return (
    <div className="layout-container">
      <div className="layout-grid">
        <div className="main-column" style={{ width: mainColumn.width }}>
          {mainColumn.sections.map(sectionId => renderSection(sectionId))}
        </div>
        
        <div className="side-column" style={{ width: sideColumn.width }}>
          {sideColumn.sections.map(sectionId => renderSection(sectionId))}
        </div>
      </div>
    </div>
  );
};

export default Layout;