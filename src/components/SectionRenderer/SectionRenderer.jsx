import React from 'react';
import './SectionRenderer.css';

const SectionRenderer = ({ section, data }) => {
  const getActivityIcon = (type) => {
    const icons = {
      email: '📧',
      call: '📞',
      meeting: '🤝',
      task: '📋'
    };
    return icons[type] || '📄';
  };

  const getStatusClass = (status) => {
    return `status-${status}`;
  };

  const getPriorityClass = (priority) => {
    return `priority-${priority}`;
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (timeStr) => {
    return timeStr;
  };

  const renderActivities = () => {
    const activities = data.activities || [];
    const sortedActivities = activities.sort((a, b) => new Date(b.date) - new Date(a.date));

    return (
      <div className="activities-list">
        {sortedActivities.map(activity => (
          <div key={activity.id} className={`activity-item ${getStatusClass(activity.status)} ${getPriorityClass(activity.priority)}`}>
            <div className="activity-header">
              <div className="activity-icon">
                {getActivityIcon(activity.type)}
              </div>
              <div className="activity-info">
                <h4 className="activity-title">{activity.title}</h4>
                <p className="activity-description">{activity.description}</p>
              </div>
              <div className="activity-meta">
                <span className={`activity-status ${getStatusClass(activity.status)}`}>
                  {activity.status}
                </span>
                <span className={`activity-priority ${getPriorityClass(activity.priority)}`}>
                  {activity.priority}
                </span>
              </div>
            </div>
            <div className="activity-footer">
              <span className="activity-date">
                {formatDate(activity.date)} at {formatTime(activity.time)}
              </span>
            </div>
          </div>
        ))}
        
        {activities.length === 0 && (
          <div className="empty-state">
            <p>No activities found</p>
          </div>
        )}
      </div>
    );
  };

  const renderNotes = () => {
    const notes = data.notes || [];
    const sortedNotes = notes.sort((a, b) => new Date(b.date) - new Date(a.date));

    return (
      <div className="notes-list">
        {sortedNotes.map(note => (
          <div key={note.id} className="note-item">
            <div className="note-header">
              <h4 className="note-title">{note.title}</h4>
              <span className={`note-type ${note.type}`}>
                {note.type.replace('-', ' ')}
              </span>
            </div>
            <p className="note-content">{note.content}</p>
            <div className="note-footer">
              <span className="note-author">by {note.author}</span>
              <span className="note-date">
                {formatDate(note.date)} at {formatTime(note.time)}
              </span>
            </div>
          </div>
        ))}
        
        {notes.length === 0 && (
          <div className="empty-state">
            <p>No notes found</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="section-container">
      <div className="section-header">
        <h3 className="section-title">{section.title}</h3>
        <button className="section-action">+ Add New</button>
      </div>
      
      <div className="section-content">
        {section.type === 'activities' && renderActivities()}
        {section.type === 'notes' && renderNotes()}
      </div>
    </div>
  );
};

export default SectionRenderer;