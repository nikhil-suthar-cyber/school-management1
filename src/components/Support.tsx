import React, { useState } from 'react';
import { Send, LifeBuoy, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';

export const Support: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    issueType: 'Software Issue',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    console.log('Support Ticket Submitted:', formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setFormData({
      name: '',
      email: '',
      issueType: 'Software Issue',
      subject: '',
      message: ''
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  if (submitted) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-20 text-center space-y-4"
      >
        <div className="w-20 h-20 bg-success/10 text-success rounded-full flex items-center justify-center">
          <CheckCircle size={48} />
        </div>
        <h2 className="text-2xl font-bold text-text-color">Ticket Submitted Successfully!</h2>
        <p className="text-text-light max-w-md">
          Thank you for reaching out. Our support team will review your request and get back to you shortly via email.
        </p>
        <button 
          onClick={() => setSubmitted(false)}
          className="text-primary font-semibold hover:underline"
        >
          Submit another ticket
        </button>
      </motion.div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-2xl md:text-3xl font-bold text-[#1e293b] flex items-center gap-3">
          <LifeBuoy className="text-primary" />
          Help & Support
        </h2>
        <p className="text-sm text-text-light">Have a question or facing an issue? We're here to help.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-border p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-sm font-semibold text-text-color">Your Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-3 focus:ring-primary/10 transition-all"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-sm font-semibold text-text-color">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="example@school.com"
                    className="border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-3 focus:ring-primary/10 transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label htmlFor="issueType" className="text-sm font-semibold text-text-color">Issue Type</label>
                  <select 
                    id="issueType" 
                    value={formData.issueType}
                    onChange={handleChange}
                    className="border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-3 focus:ring-primary/10 transition-all bg-white"
                  >
                    <option value="Software Issue">Software Issue</option>
                    <option value="Billing Issue">Billing Issue</option>
                    <option value="Account Issue">Account Issue</option>
                    <option value="Feature Request">Feature Request</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="subject" className="text-sm font-semibold text-text-color">Subject</label>
                  <input 
                    type="text" 
                    id="subject" 
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Briefly describe the issue"
                    className="border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-3 focus:ring-primary/10 transition-all"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-sm font-semibold text-text-color">Message Details</label>
                <textarea 
                  id="message" 
                  rows={5}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us more about your issue..."
                  className="border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-3 focus:ring-primary/10 transition-all resize-none"
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-primary-dark transition-all shadow-md flex items-center justify-center gap-2"
              >
                <Send size={18} />
                Send Ticket
              </button>
            </form>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-border p-6 space-y-4">
            <h3 className="font-bold text-text-color">Quick Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-text-light">
                <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                  <Send size={14} />
                </div>
                support@schoolmanager.com
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-primary to-primary-dark rounded-xl shadow-sm p-6 text-white space-y-3">
            <h3 className="font-bold">24/7 Support</h3>
            <p className="text-xs opacity-80">
              Our technical team is available around the clock to ensure your school management system runs smoothly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
