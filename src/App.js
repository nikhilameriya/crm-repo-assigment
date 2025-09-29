import React, { useState, useEffect } from 'react';
import './App.css';
import Layout from './components/Layout/Layout';
import layoutConfig from './data/layout.json';
import contactFieldsConfig from './data/contactFields.json';
import contactDataConfig from './data/contactData.json';

function App() {
  const [layoutData, setLayoutData] = useState(null);
  const [fieldsData, setFieldsData] = useState(null);
  const [contactData, setContactData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      // Simulate API loading delay
      setTimeout(() => {
        setLayoutData(layoutConfig);
        setFieldsData(contactFieldsConfig);
        setContactData(contactDataConfig);
        setLoading(false);
      }, 500);
    } catch (err) {
      setError('Failed to load configuration data');
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="app-loading">
        <div className="loading-spinner"></div>
        <p>Loading CRM Contact Details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app-error">
        <h2>Error</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="app-header">
        <h1>CRM Contact Management</h1>
        <div className="header-actions">
          <button className="btn-secondary">Edit Contact</button>
          <button className="btn-primary">Save Changes</button>
        </div>
      </header>
      
      <main className="app-main">
        <Layout 
          layoutConfig={layoutData}
          fieldsConfig={fieldsData}
          contactData={contactData}
        />
      </main>
    </div>
  );
}

export default App;