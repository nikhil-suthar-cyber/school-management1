import React, { useState, useEffect } from 'react';
import { User, Page } from '../types';
import { Plus, Edit2, Trash2, User as UserIcon, Mail, Shield, Smartphone } from 'lucide-react';
import { motion } from 'motion/react';

interface UserFormProps {
  user?: User;
  onSave: (user: Omit<User, 'id'> & { id?: string }) => void;
  onCancel: () => void;
}

export const UserForm: React.FC<UserFormProps> = ({ user, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Omit<User, 'id' | 'lastActive'>>({
    name: '',
    email: '',
    phone: '',
    role: 'Teacher',
    status: 'Active',
  });

  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        phone: user.phone || '',
        role: user.role,
        status: user.status,
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    if (id === 'phone') {
      const sanitized = value.replace(/\D/g, '').slice(0, 10);
      setFormData(prev => ({ ...prev, [id]: sanitized }));
      return;
    }
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const validate = () => {
    const newErrors: Partial<Record<string, string>> = {};
    if (!formData.name) newErrors.name = 'Full name is required';
    
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }

    if (!formData.phone) {
      newErrors.phone = 'Phone is required';
    } else if (formData.phone.length !== 10) {
      newErrors.phone = 'Must be 10 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSave({ ...formData, id: user?.id, lastActive: user?.lastActive || 'Never' });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-text-color flex items-center gap-2">
          <UserIcon className="text-primary" />
          {user ? 'Edit User' : 'Add New User'}
        </h2>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-border p-6 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-sm font-semibold text-text-color">Full Name *</label>
              <input 
                type="text" 
                id="name" 
                placeholder="Enter user name" 
                required 
                value={formData.name}
                onChange={handleChange}
                className={`border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-3 focus:ring-primary/10 transition-all ${errors.name ? 'border-danger ring-danger/10' : ''}`}
              />
              {errors.name && <span className="text-[10px] text-danger">{errors.name}</span>}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-semibold text-text-color">Email Address *</label>
              <input 
                type="email" 
                id="email" 
                placeholder="user@example.com" 
                required 
                value={formData.email}
                onChange={handleChange}
                className={`border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-3 focus:ring-primary/10 transition-all ${errors.email ? 'border-danger ring-danger/10' : ''}`}
              />
              {errors.email && <span className="text-[10px] text-danger">{errors.email}</span>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="flex flex-col gap-2">
              <label htmlFor="phone" className="text-sm font-semibold text-text-color">Phone Number *</label>
              <input 
                type="tel" 
                id="phone" 
                placeholder="10 digit number" 
                required 
                maxLength={10}
                value={formData.phone}
                onChange={handleChange}
                className={`border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-3 focus:ring-primary/10 transition-all ${errors.phone ? 'border-danger ring-danger/10' : ''}`}
              />
              {errors.phone && <span className="text-[10px] text-danger">{errors.phone}</span>}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="role" className="text-sm font-semibold text-text-color">Access Role *</label>
              <select 
                id="role" 
                value={formData.role}
                onChange={handleChange}
                className="border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-3 focus:ring-primary/10 transition-all bg-white"
              >
                <option value="Admin">Admin</option>
                <option value="Teacher">Teacher</option>
                <option value="Student">Student</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="status" className="text-sm font-semibold text-text-color">Status *</label>
              <select 
                id="status" 
                value={formData.status}
                onChange={handleChange}
                className="border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-3 focus:ring-primary/10 transition-all bg-white"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-border">
            <button 
              type="submit" 
              className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-8 rounded-lg text-sm transition-all"
            >
              {user ? 'Update User' : 'Create User'}
            </button>
            <button 
              type="button" 
              onClick={onCancel}
              className="bg-light-gray hover:bg-border text-text-color font-bold py-3 px-8 rounded-lg text-sm transition-all"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
