import React, { useState } from 'react';
import { School as SchoolType, User, Subscription, Page } from '../types';
import { Plus, Edit2, Trash2, Users, CreditCard, School } from 'lucide-react';
import { motion } from 'motion/react';

interface SchoolsListProps {
  schools: SchoolType[];
  onAddSchool: () => void;
  onEditSchool: (school: SchoolType) => void;
  onDeleteSchool: (id: string) => void;
  searchQuery: string;
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}

export const SchoolsList: React.FC<SchoolsListProps> = ({ 
  schools, 
  onAddSchool, 
  onEditSchool, 
  onDeleteSchool,
  searchQuery,
  currentPage,
  setCurrentPage
}) => {
  const activeTab = currentPage === 'schools' || currentPage === 'schools-list' ? 'schools' : 'subscriptions';

  const filteredSchools = schools.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Mock data for Subscriptions
  const mockSubscriptions: Subscription[] = [
    { id: '1', schoolId: '1', planName: 'Premium Plan', expiryDate: '2027-01-01', amount: 150000, status: 'Active' },
    { id: '2', schoolId: '2', planName: 'Standard Plan', expiryDate: '2026-08-15', amount: 225000, status: 'Expiring' },
    { id: '3', schoolId: '3', planName: 'Basic Plan', expiryDate: '2026-03-10', amount: 250000, status: 'Expired' },
  ];

  const tabs = [
    { id: 'schools', label: 'School List', icon: School },
    { id: 'subscriptions', label: 'Subscription Details', icon: CreditCard },
  ];

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-2xl md:text-3xl font-bold text-[#1e293b]">Manage Schools</h2>
        <p className="text-sm text-text-light">View and manage schools, users, and subscriptions.</p>
      </div>

      {/* Tabs Navigation */}
      <div className="flex border-b border-border gap-6">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          const pageId = tab.id === 'schools' ? 'schools-list' : 'subscription-details';
          return (
            <button
              key={tab.id}
              onClick={() => setCurrentPage(pageId as Page)}
              className={`
                flex items-center gap-2 px-4 py-3 text-sm font-semibold transition-all border-b-2 -mb-px
                ${isActive 
                  ? 'border-primary text-primary' 
                  : 'border-transparent text-text-light hover:text-primary hover:border-primary/50'}
              `}
            >
              <Icon size={18} />
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="flex gap-3">
        <button 
          onClick={onAddSchool}
          className="bg-gradient-to-r from-primary to-primary-dark text-white px-6 py-2.5 rounded-lg font-semibold flex items-center gap-2 shadow-md hover:shadow-primary/30 hover:-translate-y-0.5 transition-all active:scale-95"
        >
          <Plus size={18} />
          {activeTab === 'schools' ? 'Add New School' : 'New Subscription'}
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-border overflow-hidden">
        <div className="overflow-x-auto">
          {activeTab === 'schools' && (
            <table className="w-full border-collapse">
              <thead className="bg-gradient-to-r from-light-gray to-[#f1f5f9] border-b-2 border-border">
                <tr>
                  <th className="px-6 py-4 text-left text-[11px] md:text-[13px] font-bold text-text-color uppercase tracking-wider">School Name</th>
                  <th className="px-6 py-4 text-left text-[11px] md:text-[13px] font-bold text-text-color uppercase tracking-wider">Students</th>
                  <th className="px-6 py-4 text-left text-[11px] md:text-[13px] font-bold text-text-color uppercase tracking-wider">Teachers</th>
                  <th className="px-6 py-4 text-left text-[11px] md:text-[13px] font-bold text-text-color uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-4 text-left text-[11px] md:text-[13px] font-bold text-text-color uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-[11px] md:text-[13px] font-bold text-text-color uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredSchools.length > 0 ? (
                  filteredSchools.map((school, index) => (
                    <motion.tr 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      key={school.id} 
                      className="hover:bg-light-gray transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-text-color">{school.name}</div>
                        <div className="text-xs text-text-light">{school.location}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-text-color">
                        {school.students.toLocaleString('en-US')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-text-color">
                        {school.teachers.toLocaleString('en-US')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-text-color font-semibold">
                        ${school.amount.toLocaleString('en-US')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`
                          status-badge
                          ${school.status === 'Paid' ? 'status-badge-paid' : ''}
                          ${school.status === 'Pending' ? 'status-badge-pending' : ''}
                          ${school.status === 'Unpaid' ? 'status-badge-unpaid' : ''}
                        `}>
                          {school.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex gap-2">
                          <button 
                            onClick={() => onEditSchool(school)}
                            className="p-2 rounded-md bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all"
                            title="Edit"
                          >
                            <Edit2 size={14} />
                          </button>
                          <button 
                            onClick={() => onDeleteSchool(school.id)}
                            className="p-2 rounded-md bg-danger/10 text-danger hover:bg-danger hover:text-white transition-all"
                            title="Delete"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-text-light">
                      {searchQuery ? 'No schools match your search.' : (
                        <div>
                          <p className="mb-4">No schools found.</p>
                          <button 
                            onClick={onAddSchool}
                            className="text-primary font-semibold underline hover:text-primary-dark"
                          >
                            Add one now!
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}

          {activeTab === 'subscriptions' && (
            <table className="w-full border-collapse">
              <thead className="bg-gradient-to-r from-light-gray to-[#f1f5f9] border-b-2 border-border">
                <tr>
                  <th className="px-6 py-4 text-left text-[11px] md:text-[13px] font-bold text-text-color uppercase tracking-wider">Plan Name</th>
                  <th className="px-6 py-4 text-left text-[11px] md:text-[13px] font-bold text-text-color uppercase tracking-wider">Expiry Date</th>
                  <th className="px-6 py-4 text-left text-[11px] md:text-[13px] font-bold text-text-color uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-4 text-left text-[11px] md:text-[13px] font-bold text-text-color uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-[11px] md:text-[13px] font-bold text-text-color uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {mockSubscriptions.map((sub, index) => (
                  <motion.tr 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    key={sub.id} 
                    className="hover:bg-light-gray transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-text-color">{sub.planName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-text-color">{sub.expiryDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-text-color font-semibold">${sub.amount.toLocaleString('en-US')}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`
                        status-badge
                        ${sub.status === 'Active' ? 'status-badge-paid' : ''}
                        ${sub.status === 'Expiring' ? 'status-badge-pending' : ''}
                        ${sub.status === 'Expired' ? 'status-badge-unpaid' : ''}
                      `}>
                        {sub.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex gap-2">
                        <button className="p-2 rounded-md bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all"><Edit2 size={14} /></button>
                        <button className="p-2 rounded-md bg-danger/10 text-danger hover:bg-danger hover:text-white transition-all"><Trash2 size={14} /></button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};
