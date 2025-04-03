import React, { useState, useEffect } from 'react';
import { FaInstagram, FaLinkedin, FaWhatsapp, FaFacebook, FaTwitter, FaImage, FaTimes } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './PostModal.css';
import { useTheme } from '@mui/material/styles';

const PostModal = ({ event, onClose, onSave, slotInfo }) => {
  const [postData, setPostData] = useState({
    id: null,
    title: '',
    platform: 'instagram',
    content: '',
    media: '',
    start: new Date(),
    end: new Date(new Date().setHours(new Date().getHours() + 1)),
    mediaPreview: null
  });

  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  useEffect(() => {
    if (event) {
      // Editing existing event
      setPostData({
        id: event.id,
        title: event.title || '',
        platform: event.platform || 'instagram',
        content: event.content || '',
        media: event.media || '',
        start: event.start ? new Date(event.start) : new Date(),
        end: event.end ? new Date(event.end) : new Date(new Date().setHours(new Date().getHours() + 1)),
        mediaPreview: event.media
      });
    } else if (slotInfo) {
      // Creating new event from selected slot
      setPostData({
        ...postData,
        start: slotInfo.start ? new Date(slotInfo.start) : new Date(),
        end: slotInfo.end ? new Date(slotInfo.end) : new Date(new Date().setHours(new Date().getHours() + 1))
      });
    }
  }, [event, slotInfo]);

  useEffect(() => {
    const modalElement = document.querySelector('.post-modal');
    if (modalElement) {
      if (isDarkMode) {
        modalElement.classList.add('dark-mode');
      } else {
        modalElement.classList.remove('dark-mode');
      }
    }
  }, [isDarkMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostData({ ...postData, [name]: value });
  };

  const handleDateChange = (date) => {
    if (!date) return;
    
    // Create a new date with the same time
    const newStart = new Date(date);
    const currentStart = postData.start || new Date();
    
    newStart.setHours(
      currentStart.getHours(),
      currentStart.getMinutes()
    );
    
    // End time is 1 hour after start by default
    const newEnd = new Date(newStart);
    newEnd.setHours(newStart.getHours() + 1);
    
    setPostData({
      ...postData,
      start: newStart,
      end: newEnd
    });
  };

  const handleTimeChange = (time) => {
    if (!time) return;
    
    const newStart = new Date(postData.start || new Date());
    newStart.setHours(time.getHours(), time.getMinutes());
    
    const newEnd = new Date(newStart);
    newEnd.setHours(newStart.getHours() + 1);
    
    setPostData({
      ...postData,
      start: newStart,
      end: newEnd
    });
  };

  const handleMediaChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPostData({
          ...postData,
          media: reader.result,
          mediaPreview: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeMedia = () => {
    setPostData({
      ...postData,
      media: '',
      mediaPreview: null
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Make sure we have all required data properly formatted
    const formattedPost = {
      ...postData,
      // If this is a new post and no ID was set, create one
      id: postData.id || `post-${Date.now()}`,
      // Make sure start and end dates are properly set
      start: postData.start || new Date(),
      end: postData.end || new Date(new Date().setHours(new Date().getHours() + 1))
    };
    
    // For debugging
    console.log("Saving post:", formattedPost);
    
    onSave(formattedPost);
  };

  return (
    <div className="modal-overlay">
      <div className="post-modal">
        <div className="modal-header">
          <h2>{event ? 'Edit Post' : 'Create New Post'}</h2>
          <button className="close-modal" onClick={onClose}>
            <FaTimes />
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={postData.title}
              onChange={handleChange}
              placeholder="Enter post title"
              required
              className="form-control"
            />
          </div>
          
          <div className="form-group">
            <label>Platform</label>
            <div className="platform-selector">
              <button
                type="button"
                className={`platform-btn ${postData.platform === 'instagram' ? 'active' : ''}`}
                onClick={() => setPostData({ ...postData, platform: 'instagram' })}
              >
                <FaInstagram /> Instagram
              </button>
              <button
                type="button"
                className={`platform-btn ${postData.platform === 'linkedin' ? 'active' : ''}`}
                onClick={() => setPostData({ ...postData, platform: 'linkedin' })}
              >
                <FaLinkedin /> LinkedIn
              </button>
              <button
                type="button"
                className={`platform-btn ${postData.platform === 'whatsapp' ? 'active' : ''}`}
                onClick={() => setPostData({ ...postData, platform: 'whatsapp' })}
              >
                <FaWhatsapp /> WhatsApp
              </button>
              <button
                type="button"
                className={`platform-btn ${postData.platform === 'facebook' ? 'active' : ''}`}
                onClick={() => setPostData({ ...postData, platform: 'facebook' })}
              >
                <FaFacebook /> Facebook
              </button>
              <button
                type="button"
                className={`platform-btn ${postData.platform === 'twitter' ? 'active' : ''}`}
                onClick={() => setPostData({ ...postData, platform: 'twitter' })}
              >
                <FaTwitter /> Twitter
              </button>
            </div>
          </div>
          
          <div className="form-group">
            <label>Content</label>
            <textarea
              name="content"
              value={postData.content}
              onChange={handleChange}
              placeholder="Write your post content here..."
              className="form-control post-textarea"
              rows={5}
            />
          </div>
          
          <div className="form-group">
            <label>Media</label>
            <div className="media-upload-container">
              <label className="media-upload-btn">
                <FaImage /> Upload Image
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleMediaChange}
                  style={{ display: 'none' }}
                />
              </label>
              
              {postData.mediaPreview && (
                <div className="media-preview">
                  <img src={postData.mediaPreview} alt="Preview" />
                  <button 
                    type="button" 
                    className="remove-media-btn"
                    onClick={removeMedia}
                  >
                    <FaTimes />
                  </button>
                </div>
              )}
            </div>
          </div>
          
          <div className="form-group datetime-group">
            <div className="date-picker-container">
              <label>Date</label>
              <DatePicker
                selected={postData.start}
                onChange={handleDateChange}
                dateFormat="MMMM d, yyyy"
                className="form-control"
                required
              />
            </div>
            
            <div className="time-picker-container">
              <label>Time</label>
              <DatePicker
                selected={postData.start}
                onChange={handleTimeChange}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="h:mm aa"
                className="form-control"
                required
              />
            </div>
          </div>
          
          <div className="modal-actions">
            <button type="button" onClick={onClose} className="btn-cancel">
              Cancel
            </button>
            <button type="submit" className="btn-save">
              {event ? 'Update Post' : 'Schedule Post'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostModal; 