import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    phone: '',
    city: '',
    reason: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const sendEmail = (e) => {
    e.preventDefault();
    
    const templateParams = {
      fullname: formData.fullname,
      email: formData.email,
      phone: formData.phone,
      city: formData.city,
      reason: formData.reason,
      message: formData.message
    };

    emailjs.sendForm(
      process.env.REACT_APP_EMAILJS_SERVICE_ID ?? '',
      process.env.REACT_APP_EMAILJS_TEMPLATE_ID ?? '',
      e.target,
      process.env.REACT_APP_EMAILJS_USER_ID
    )
    .then((result) => {
      console.log(result.text);
      alert('Message sent successfully!');
    })
    .catch((error) => {
      console.error(error.text);
      alert('Failed to send message. Please try again.');
    });

    e.target.reset();
  };

  return (
    <div className="w-full rounded-lg p-8">
      <form onSubmit={sendEmail}>
        <div className="mb-4 space-y-3">
          <label className="block text-gray-700">Full Name</label>
          <input
            type="text"
            placeholder="Your fullname"
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-400 shadow-sm rounded bg-transparent focus:outline-none focus:ring-1 focus:ring-primary focus:ring-opacity-50"
          />
        </div>
        <div className="mb-4 space-y-3">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            placeholder="Your email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-400 shadow-sm bg-transparent rounded focus:outline-none focus:ring-1 focus:ring-primary focus:ring-opacity-50"
          />
        </div>
        <div className="mb-4 space-y-3">
          <label className="block text-gray-700">Phone Number</label>
          <input
            type="tel"
            placeholder="Your phone number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded border-gray-400 shadow-sm bg-transparent focus:outline-none focus:ring-1 focus:ring-primary focus:ring-opacity-50"
          />
        </div>
        <div className="mb-4 space-y-3">
          <label className="block text-gray-700">City</label>
          <input
            type="text"
            placeholder="Your city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded border-gray-400 shadow-sm bg-transparent focus:outline-none focus:ring-1 focus:ring-primary focus:ring-opacity-50"
          />
        </div>
        <div className="mb-4 space-y-3">
          <label className="block text-gray-700">Reason</label>
          <input
            type="text"
            placeholder="Your reason"
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded border-gray-400 shadow-sm bg-transparent focus:outline-none focus:ring-1 focus:ring-primary focus:ring-opacity-50"
          />
        </div>
        <div className="mb-4 space-y-3">
          <label className="block text-gray-700">Your message</label>
          <textarea
            placeholder="Your message"
            name="message"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded border-gray-400 shadow-sm bg-transparent focus:outline-none focus:ring-1 focus:ring-primary focus:ring-opacity-50"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-primary text-white p-2 rounded"
        >
          Send message
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
