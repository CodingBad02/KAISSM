import React, { useState, useContext, useEffect } from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { FaInstagram, FaLinkedin, FaWhatsapp, FaFacebook, FaTwitter, FaPlus, FaTimes } from 'react-icons/fa';
import PostModal from '../modals/PostModal';
import { PostContext } from '../../context/PostContext';
import './ContentCalendar.css';
import { useTheme } from '@mui/material/styles';

const localizer = momentLocalizer(moment);

const ContentCalendar = () => {
  const { posts, updatePost, deletePost, addPost } = useContext(PostContext);
  const [view, setView] = useState('month');
  const [date, setDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [expandedEvent, setExpandedEvent] = useState(null);
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  useEffect(() => {
    const calendarElement = document.querySelector('.content-calendar');
    if (calendarElement) {
      if (isDarkMode) {
        calendarElement.classList.add('dark-mode');
      } else {
        calendarElement.classList.remove('dark-mode');
      }
    }
  }, [isDarkMode]);

  const handleSelectEvent = (event) => {
    if (expandedEvent && expandedEvent.id === event.id) {
      // If clicking on already expanded event, open edit modal
      setSelectedEvent(event);
      setShowModal(true);
      setExpandedEvent(null);
    } else {
      // Otherwise, expand the event preview
      setExpandedEvent(event);
    }
  };

  const handleSelectSlot = (slot) => {
    setSelectedEvent(null);
    setSelectedSlot(slot);
    setShowModal(true);
    setExpandedEvent(null);
  };

  const handleSavePost = (postData) => {
    // Ensure dates are properly formatted as Date objects
    const formattedPost = {
      ...postData,
      start: new Date(postData.start),
      end: new Date(postData.end),
    };

    if (formattedPost.id && posts.some(post => post.id === formattedPost.id)) {
      // This is an existing post being updated
      console.log("Updating post:", formattedPost);
      updatePost(formattedPost);
    } else {
      // This is a new post being added
      // Remove any temporary ID that might have been set and let addPost generate a proper one
      console.log("Adding new post:", formattedPost);
      
      // Check if the post object contains all required properties
      if (!formattedPost.title) {
        console.error("Title is required for a post");
        return;
      }
      
      if (!formattedPost.platform) {
        console.error("Platform is required for a post");
        return;
      }
      
      addPost(formattedPost);
    }
    
    setShowModal(false);
  };

  const handleDeletePost = (postId) => {
    deletePost(postId);
    setExpandedEvent(null);
  };

  const handleNavigate = (newDate) => {
    setDate(newDate);
  };

  const handleViewChange = (newView) => {
    setView(newView);
  };

  const closeExpandedEvent = (e) => {
    e.stopPropagation();
    setExpandedEvent(null);
  };

  // Custom event component to show platform icons
  const EventComponent = ({ event }) => {
    const getPlatformIcon = (platform) => {
      switch (platform) {
        case 'instagram':
          return <FaInstagram className="event-icon instagram" />;
        case 'linkedin':
          return <FaLinkedin className="event-icon linkedin" />;
        case 'whatsapp':
          return <FaWhatsapp className="event-icon whatsapp" />;
        case 'facebook':
          return <FaFacebook className="event-icon facebook" />;
        case 'twitter':
          return <FaTwitter className="event-icon twitter" />;
        default:
          return null;
      }
    };

    return (
      <div className={`custom-event ${event.platform}`}>
        {getPlatformIcon(event.platform)}
        <span className="event-title">{event.title}</span>
      </div>
    );
  };

  // Custom toolbar component
  const CustomToolbar = (toolbar) => {
    const goToToday = () => {
      toolbar.onNavigate('TODAY');
    };

    const goToPrev = () => {
      toolbar.onNavigate('PREV');
    };

    const goToNext = () => {
      toolbar.onNavigate('NEXT');
    };

    const label = () => {
      const date = moment(toolbar.date);
      return (
        <span className="calendar-label">
          {view === 'month' 
            ? date.format('MMMM YYYY')
            : view === 'week'
              ? `Week of ${date.startOf('week').format('MMM D, YYYY')}`
              : date.format('dddd, MMMM D, YYYY')
          }
        </span>
      );
    };

    return (
      <div className="calendar-toolbar">
        <div className="calendar-toolbar-left">
          <button onClick={goToToday} className="toolbar-button today-button">
            Today
          </button>
          <div className="toolbar-nav-buttons">
            <button onClick={goToPrev} className="toolbar-button nav-button">
              &lt;
            </button>
            <button onClick={goToNext} className="toolbar-button nav-button">
              &gt;
            </button>
          </div>
          {label()}
        </div>
        <div className="calendar-toolbar-right">
          <button 
            onClick={() => toolbar.onView(Views.DAY)} 
            className={`toolbar-button view-button ${view === 'day' ? 'active' : ''}`}
          >
            Day
          </button>
          <button 
            onClick={() => toolbar.onView(Views.WEEK)} 
            className={`toolbar-button view-button ${view === 'week' ? 'active' : ''}`}
          >
            Week
          </button>
          <button 
            onClick={() => toolbar.onView(Views.MONTH)} 
            className={`toolbar-button view-button ${view === 'month' ? 'active' : ''}`}
          >
            Month
          </button>
          <button 
            onClick={() => toolbar.onView(Views.AGENDA)} 
            className={`toolbar-button view-button ${view === 'agenda' ? 'active' : ''}`}
          >
            Agenda
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="content-calendar">
      <h1>Content Calendar</h1>
      <div className="calendar-container">
        <Calendar
          localizer={localizer}
          events={posts}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 650 }}
          onSelectEvent={handleSelectEvent}
          onSelectSlot={handleSelectSlot}
          selectable
          view={view}
          date={date}
          onView={handleViewChange}
          onNavigate={handleNavigate}
          components={{
            event: EventComponent,
            toolbar: CustomToolbar
          }}
          eventPropGetter={(event) => ({
            className: `event-${event.platform}`
          })}
          popup
          views={['month', 'week', 'day', 'agenda']}
        />
      </div>
      
      {expandedEvent && (
        <div className="event-preview" onClick={(e) => e.stopPropagation()}>
          <div className="event-preview-header">
            <h3>{expandedEvent.title}</h3>
            <button className="close-preview" onClick={closeExpandedEvent}>
              <FaTimes />
            </button>
          </div>
          <div className="event-preview-content">
            <div className="event-preview-details">
              <p><strong>Platform:</strong> {expandedEvent.platform.charAt(0).toUpperCase() + expandedEvent.platform.slice(1)}</p>
              <p><strong>Date:</strong> {moment(expandedEvent.start).format('MMMM D, YYYY')}</p>
              <p><strong>Time:</strong> {moment(expandedEvent.start).format('h:mm A')}</p>
              {expandedEvent.media && (
                <div className="event-preview-media">
                  <img src={expandedEvent.media} alt="Post media" />
                </div>
              )}
              <div className="event-preview-text">
                <p>{expandedEvent.content}</p>
              </div>
            </div>
            <div className="event-preview-actions">
              <button 
                className="edit-event-btn"
                onClick={() => {
                  setSelectedEvent(expandedEvent);
                  setShowModal(true);
                  setExpandedEvent(null);
                }}
              >
                Edit Post
              </button>
              <button 
                className="delete-event-btn"
                onClick={() => handleDeletePost(expandedEvent.id)}
              >
                Delete Post
              </button>
            </div>
          </div>
        </div>
      )}
      
      <button 
        className="add-post-btn"
        onClick={() => {
          setSelectedEvent(null);
          setSelectedSlot({start: new Date(), end: new Date()});
          setShowModal(true);
        }}
      >
        <FaPlus />
      </button>
      
      {showModal && (
        <PostModal
          event={selectedEvent}
          onClose={() => setShowModal(false)}
          onSave={handleSavePost}
          slotInfo={selectedSlot}
        />
      )}
    </div>
  );
};

export default ContentCalendar; 