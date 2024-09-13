import React, { useState } from 'react';
import axios from 'axios';

const ContactUs = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError(null);
    setSuccess(null);

    try {
      await axios.post('http://localhost:8090/api/v1/contact', formData);
      setSuccess('Your message has been sent successfully!');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setError('Failed to send your message. Please try again later.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className='container mx-auto p-6 md:p-12'>
      <h1 className='text-4xl font-bold mb-8 text-center'>Contact Us</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
        {/* Contact Form */}
        <div className='bg-white p-6 rounded-lg shadow-lg'>
          <h2 className='text-2xl font-semibold mb-4'>Send Us a Message</h2>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <input
              type='text'
              name='name'
              placeholder='Your Name'
              value={formData.name}
              onChange={handleChange}
              className='w-full p-3 border border-gray-300 rounded-lg'
              required
            />
            <input
              type='email'
              name='email'
              placeholder='Your Email'
              value={formData.email}
              onChange={handleChange}
              className='w-full p-3 border border-gray-300 rounded-lg'
              required
            />
            <input
              type='text'
              name='subject'
              placeholder='Subject'
              value={formData.subject}
              onChange={handleChange}
              className='w-full p-3 border border-gray-300 rounded-lg'
              required
            />
            <textarea
              name='message'
              placeholder='Your Message'
              value={formData.message}
              onChange={handleChange}
              className='w-full p-3 border border-gray-300 rounded-lg'
              rows='4'
              required
            />
            <button
              type='submit'
              className='w-full bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition duration-300'
              disabled={sending}
            >
              {sending ? 'Sending...' : 'Send Message'}
            </button>
            {success && <p className='text-green-600'>{success}</p>}
            {error && <p className='text-red-600'>{error}</p>}
          </form>
        </div>
        <div className='bg-white p-6 rounded-lg shadow-lg'>
          <h2 className='text-2xl font-semibold mb-4 text-center'>Our Contact Information</h2>
          <p className='mb-4'>
            <strong>Email:</strong> contact@theaniClothing.com
          </p>
          <p className='mb-4'>
            <strong>Phone:</strong> (123) 456-7890
          </p>
          <p className='mb-4'>
            <strong>Address:</strong> The aniClothing pvt.Ltd ,Hyderabad
          </p>

        </div>
      </div>
    </div>
  );
};

export default ContactUs;
