import React, { useState, useEffect } from 'react';
import { School, SchoolStatus } from '../types';
import { Check, X } from 'lucide-react';

interface SchoolFormProps {
  school?: School;
  onSave: (school: Omit<School, 'id'> & { id?: string }) => void;
  onCancel: () => void;
}

export const SchoolForm: React.FC<SchoolFormProps> = ({ school, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Omit<School, 'id'>>({
    name: '',
    address: '',
    state: '',
    zipCode: '',
    location: '',
    email: '',
    phone: '',
    password: '',
    startDate: '',
    endDate: '',
    students: 0,
    teachers: 0,
    amount: 0,
    status: 'Pending',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof Omit<School, 'id'> | 'confirmPassword', string>>>({});

  const getPasswordStrength = (password: string) => {
    if (!password) return { label: '', color: 'bg-border', width: '0%', score: 0 };
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 1) return { label: 'Weak', color: 'bg-danger', width: '25%', score };
    if (score <= 2) return { label: 'Medium', color: 'bg-warning', width: '50%', score };
    if (score <= 3) return { label: 'Strong', color: 'bg-success', width: '75%', score };
    return { label: 'Very Strong', color: 'bg-primary', width: '100%', score };
  };

  useEffect(() => {
    if (school) {
      setFormData({
        name: school.name,
        address: school.address || '',
        state: school.state || '',
        zipCode: school.zipCode || '',
        location: school.location,
        email: school.email || '',
        phone: school.phone || '',
        password: school.password || '',
        startDate: school.startDate,
        endDate: school.endDate,
        students: school.students,
        teachers: school.teachers,
        amount: school.amount,
        status: school.status,
      });
    }
  }, [school]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    
    // Custom phone validation (only numbers and max 10 digits)
    if (id === 'phone') {
      const sanitized = value.replace(/\D/g, '').slice(0, 10);
      setFormData(prev => ({ ...prev, [id]: sanitized }));
      return;
    }

    const val = (id === 'students' || id === 'teachers' || id === 'amount') ? Number(value) : value;
    
    setFormData(prev => ({
      ...prev,
      [id]: val
    }));

    if (errors[id as keyof Omit<School, 'id'>]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[id as keyof Omit<School, 'id'>];
        return newErrors;
      });
    }
  };

  const validate = () => {
    const newErrors: Partial<Record<keyof Omit<School, 'id'> | 'confirmPassword', string>> = {};
    if (!formData.name) newErrors.name = 'School name is required';
    if (!formData.address) newErrors.address = 'Detailed address is required';
    if (!formData.state) newErrors.state = 'State is required';
    if (!formData.zipCode) {
      newErrors.zipCode = 'Zip code is required';
    } else if (!/^\d{6}$/.test(formData.zipCode)) {
      newErrors.zipCode = 'Invalid zip code (6 digits)';
    }
    if (!formData.location) newErrors.location = 'City/Location is required';
    
    // Strict Email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Enter a valid business email (e.g. name@school.com)';
    }

    // Phone validation
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (formData.phone.length !== 10) {
      newErrors.phone = 'Mobile number must be exactly 10 digits';
    }

    // Strict Password validation
    if (!school && !formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password) {
      const strength = getPasswordStrength(formData.password);
      if (formData.password.length < 8) {
        newErrors.password = 'Minimum 8 characters required';
      } else if (strength.score < 3) {
        newErrors.password = 'Password too weak. Use numbers and special characters.';
      }
    }

    if (!formData.startDate) newErrors.startDate = 'Start date is required';
    if (!formData.endDate) newErrors.endDate = 'End date is required';
    if (formData.startDate && formData.endDate && new Date(formData.endDate) <= new Date(formData.startDate)) {
      newErrors.endDate = 'End date must be after start date';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSave({ ...formData, id: school?.id });
    }
  };

  return (
    <div className="space-y-8">
      <div className="page-header">
        <h2 className="text-2xl md:text-3xl font-bold text-[#1e293b]">
          {school ? 'Edit School' : 'Add New School'}
        </h2>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-border p-6 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-sm font-semibold text-text-color">School Name *</label>
              <input 
                type="text" 
                id="name" 
                placeholder="Full School Name" 
                required 
                value={formData.name}
                onChange={handleChange}
                className={`border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-3 focus:ring-primary/10 transition-all ${errors.name ? 'border-danger ring-danger/10' : ''}`}
              />
              {errors.name && <span className="text-[10px] text-danger">{errors.name}</span>}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="address" className="text-sm font-semibold text-text-color">Detailed Address *</label>
              <input 
                type="text" 
                id="address" 
                placeholder="Enter detailed street address" 
                required 
                value={formData.address}
                onChange={handleChange}
                className={`border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-3 focus:ring-primary/10 transition-all ${errors.address ? 'border-danger ring-danger/10' : ''}`}
              />
              {errors.address && <span className="text-[10px] text-danger">{errors.address}</span>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="flex flex-col gap-2">
                <label htmlFor="location" className="text-sm font-semibold text-text-color">City *</label>
                <input 
                  type="text" 
                  id="location" 
                  placeholder="City Name" 
                  required 
                  value={formData.location}
                  onChange={handleChange}
                  className={`border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-3 focus:ring-primary/10 transition-all ${errors.location ? 'border-danger ring-danger/10' : ''}`}
                />
                {errors.location && <span className="text-[10px] text-danger">{errors.location}</span>}
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="state" className="text-sm font-semibold text-text-color">State *</label>
                <input 
                  type="text" 
                  id="state" 
                  placeholder="State" 
                  required 
                  value={formData.state}
                  onChange={handleChange}
                  className={`border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-3 focus:ring-primary/10 transition-all ${errors.state ? 'border-danger ring-danger/10' : ''}`}
                />
                {errors.state && <span className="text-[10px] text-danger">{errors.state}</span>}
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="zipCode" className="text-sm font-semibold text-text-color">Zip Code *</label>
                <input 
                  type="text" 
                  id="zipCode" 
                  placeholder="6 Digit Zip" 
                  required 
                  maxLength={6}
                  value={formData.zipCode}
                  onChange={handleChange}
                  className={`border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-3 focus:ring-primary/10 transition-all ${errors.zipCode ? 'border-danger ring-danger/10' : ''}`}
                />
                {errors.zipCode && <span className="text-[10px] text-danger">{errors.zipCode}</span>}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-semibold text-text-color">Admin Email Address *</label>
              <input 
                type="email" 
                id="email" 
                placeholder="admin@school.com" 
                required 
                value={formData.email}
                onChange={handleChange}
                className={`border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-3 focus:ring-primary/10 transition-all ${errors.email ? 'border-danger ring-danger/10' : ''}`}
              />
              {errors.email && <span className="text-[10px] text-danger">{errors.email}</span>}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="phone" className="text-sm font-semibold text-text-color">Mobile Number (10 Digits) *</label>
              <input 
                type="tel" 
                id="phone" 
                placeholder="9876543210" 
                required 
                maxLength={10}
                value={formData.phone}
                onChange={handleChange}
                className={`border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-3 focus:ring-primary/10 transition-all ${errors.phone ? 'border-danger ring-danger/10' : ''}`}
              />
              {errors.phone && <span className="text-[10px] text-danger">{errors.phone}</span>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-sm font-semibold text-text-color">
                {school ? 'Change Password (Optional)' : 'Admin Password *'}
              </label>
              <input 
                type="password" 
                id="password" 
                placeholder="Minimum 8 characters" 
                required={!school}
                value={formData.password}
                onChange={handleChange}
                className={`border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-3 focus:ring-primary/10 transition-all ${errors.password ? 'border-danger ring-danger/10' : ''}`}
              />
              {formData.password && (
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="text-text-light">Strength: {getPasswordStrength(formData.password).label}</span>
                  </div>
                  <div className="h-1 w-full bg-border rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-300 ${getPasswordStrength(formData.password).color}`}
                      style={{ width: getPasswordStrength(formData.password).width }}
                    ></div>
                  </div>
                </div>
              )}
              {errors.password && <span className="text-[10px] text-danger">{errors.password}</span>}
              <p className="text-[10px] text-text-light">Hard password: 8+ chars, Uppercase, Numbers & Symbols.</p>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="status" className="text-sm font-semibold text-text-color">Registration Status *</label>
              <select 
                id="status" 
                required
                value={formData.status}
                onChange={handleChange}
                className="border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-3 focus:ring-primary/10 transition-all bg-white"
              >
                <option value="Paid">Paid</option>
                <option value="Pending">Pending</option>
                <option value="Unpaid">Unpaid</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col gap-2">
              <label htmlFor="startDate" className="text-sm font-semibold text-text-color">License Start Date *</label>
              <input 
                type="date" 
                id="startDate" 
                required 
                value={formData.startDate}
                onChange={handleChange}
                className={`border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-3 focus:ring-primary/10 transition-all ${errors.startDate ? 'border-danger ring-danger/10' : ''}`}
              />
              {errors.startDate && <span className="text-[10px] text-danger">{errors.startDate}</span>}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="endDate" className="text-sm font-semibold text-text-color">License End Date *</label>
              <input 
                type="date" 
                id="endDate" 
                required 
                value={formData.endDate}
                onChange={handleChange}
                className={`border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-3 focus:ring-primary/10 transition-all ${errors.endDate ? 'border-danger ring-danger/10' : ''}`}
              />
              {errors.endDate && <span className="text-[10px] text-danger">{errors.endDate}</span>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="flex flex-col gap-2">
              <label htmlFor="students" className="text-sm font-semibold text-text-color">Capacity (Students) *</label>
              <input 
                type="number" 
                id="students" 
                placeholder="e.g. 500" 
                required 
                min="0"
                value={formData.students || ''}
                onChange={handleChange}
                className="border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-3 focus:ring-primary/10 transition-all"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="teachers" className="text-sm font-semibold text-text-color">Staff (Teachers) *</label>
              <input 
                type="number" 
                id="teachers" 
                placeholder="e.g. 30" 
                required 
                min="0"
                value={formData.teachers || ''}
                onChange={handleChange}
                className="border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-3 focus:ring-primary/10 transition-all"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="amount" className="text-sm font-semibold text-text-color">Registration Amount ($) *</label>
              <input 
                type="number" 
                id="amount" 
                placeholder="10000" 
                required 
                min="0" 
                step="100"
                value={formData.amount || ''}
                onChange={handleChange}
                className="border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-3 focus:ring-primary/10 transition-all"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-border">
            <button 
              type="submit" 
              className="bg-gradient-to-r from-success to-[#059669] text-white px-8 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 shadow-md hover:shadow-success/30 hover:-translate-y-0.5 transition-all active:scale-95"
            >
              <Check size={18} />
              Save School
            </button>
            <button 
              type="button" 
              onClick={onCancel}
              className="bg-medium-gray text-text-color px-8 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-border transition-all active:scale-95"
            >
              <X size={18} />
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
