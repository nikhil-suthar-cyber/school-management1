import React from 'react';
import { School, Users, UserCheck, DollarSign, Plus } from 'lucide-react';
import { School as SchoolType, Page } from '../types';
import { motion } from 'motion/react';

interface DashboardProps {
  schools: SchoolType[];
  onAddSchool: () => void;
}

interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  delay: number;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, icon, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="bg-white rounded-xl p-6 shadow-sm border border-border hover:shadow-lg hover:-translate-y-1 hover:border-primary transition-all flex items-start gap-4"
  >
    <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-primary/5 text-primary">
      {icon}
    </div>
    <div className="flex-1">
      <div className="text-[11px] md:text-[13px] font-semibold uppercase tracking-wider text-text-light mb-2">
        {label}
      </div>
      <div className="text-2xl md:text-3xl font-bold text-[#1e293b]">
        {value}
      </div>
    </div>
  </motion.div>
);

export const Dashboard: React.FC<DashboardProps> = ({ schools, onAddSchool }) => {
  const stats = {
    totalSchools: schools.length,
    totalStudents: schools.reduce((sum, s) => sum + s.students, 0),
    totalTeachers: schools.reduce((sum, s) => sum + s.teachers, 0),
    totalRevenue: schools.reduce((sum, s) => sum + s.amount, 0),
  };

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-2xl md:text-3xl font-bold text-[#1e293b]">Admin Dashboard</h2>
        <p className="text-sm text-text-light">Welcome back! Here's your school management overview.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          label="Total Schools" 
          value={stats.totalSchools} 
          icon={<School size={28} />} 
          delay={0.1}
        />
        <StatCard 
          label="Total Students" 
          value={stats.totalStudents.toLocaleString('en-US')} 
          icon={<Users size={28} />} 
          delay={0.2}
        />
        <StatCard 
          label="Total Teachers" 
          value={stats.totalTeachers.toLocaleString('en-US')} 
          icon={<UserCheck size={28} />} 
          delay={0.3}
        />
        <StatCard 
          label="Total Revenue" 
          value={`$${stats.totalRevenue.toLocaleString('en-US')}`} 
          icon={<DollarSign size={28} />} 
          delay={0.4}
        />
      </div>

      <div className="flex gap-3">
        <button 
          onClick={onAddSchool}
          className="bg-gradient-to-r from-primary to-primary-dark text-white px-6 py-2.5 rounded-lg font-semibold flex items-center gap-2 shadow-md hover:shadow-primary/30 hover:-translate-y-0.5 transition-all active:scale-95"
        >
          <Plus size={18} />
          Add New School
        </button>
      </div>
    </div>
  );
};
