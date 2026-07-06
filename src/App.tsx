/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { SchoolsList } from './components/SchoolsList';
import { SchoolForm } from './components/SchoolForm';
import { Plans } from './components/Plans';
import { Support } from './components/Support';
import { Terms } from './components/Terms';
import { UsersList } from './components/UsersList';
import { UserForm } from './components/UserForm';
import { School, Page, Plan, User } from './types';
import { motion, AnimatePresence } from 'motion/react';

const STORAGE_KEY = 'school_management_schools';
const PLANS_STORAGE_KEY = 'school_management_plans';
const USERS_STORAGE_KEY = 'school_management_users';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [schools, setSchools] = useState<School[]>([]);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [editingSchool, setEditingSchool] = useState<School | undefined>();
  const [editingUser, setEditingUser] = useState<User | undefined>();
  const [searchQuery, setSearchQuery] = useState('');
  const [toast, setToast] = useState<{ message: string, type: 'success' | 'error' } | null>(null);

  // Load data from localStorage
  useEffect(() => {
    const savedSchools = localStorage.getItem(STORAGE_KEY);
    if (savedSchools) {
      try { setSchools(JSON.parse(savedSchools)); } catch (e) { console.error(e); }
    } else {
      const sampleSchools: School[] = [
        { id: '1', name: 'Sunrise Academy', address: '123 Academic Way', state: 'Delhi', zipCode: '110001', location: 'Delhi', email: 'admin@sunrise.com', phone: '9876543210', password: 'password123', startDate: '2026-01-01', endDate: '2026-12-31', students: 300, teachers: 25, amount: 150000, status: 'Paid' },
        { id: '2', name: 'Green Valley School', address: '456 Nature Lane', state: 'Maharashtra', zipCode: '400001', location: 'Mumbai', email: 'info@greenvalley.com', phone: '8877665544', password: 'password123', startDate: '2026-02-01', endDate: '2027-01-31', students: 450, teachers: 38, amount: 225000, status: 'Pending' },
        { id: '3', name: 'Metro Public School', address: '789 City Center', state: 'Karnataka', zipCode: '560001', location: 'Bangalore', email: 'contact@metro.com', phone: '7766554433', password: 'password123', startDate: '2026-03-15', endDate: '2027-03-14', students: 500, teachers: 42, amount: 250000, status: 'Unpaid' }
      ];
      setSchools(sampleSchools);
    }

    const savedPlans = localStorage.getItem(PLANS_STORAGE_KEY);
    if (savedPlans) {
      try { setPlans(JSON.parse(savedPlans)); } catch (e) { console.error(e); }
    } else {
      const samplePlans: Plan[] = [
        { id: '1', name: 'Basic', price: 99, billingCycle: 'Monthly', features: ['Student Portal', 'Grade Management', 'Basic Reports'] },
        { id: '2', name: 'Premium', price: 199, billingCycle: 'Monthly', features: ['Everything in Basic', 'Teacher Dashboard', 'Advanced Analytics', 'SMS Integration'] },
        { id: '3', name: 'Enterprise', price: 1999, billingCycle: 'Yearly', features: ['Unlimited Users', 'Dedicated Support', 'Custom Branding', 'API Access'] }
      ];
      setPlans(samplePlans);
    }

    const savedUsers = localStorage.getItem(USERS_STORAGE_KEY);
    if (savedUsers) {
      try { setUsers(JSON.parse(savedUsers)); } catch (e) { console.error(e); }
    } else {
      const sampleUsers: User[] = [
        { id: '1', name: 'Aaryan Sharma', email: 'aaryan@sunrise.com', phone: '9988776655', role: 'Admin', status: 'Active', lastActive: '2 hours ago' },
        { id: '2', name: 'Priya Verma', email: 'priya@greenvalley.com', phone: '8877665544', role: 'Teacher', status: 'Active', lastActive: '5 mins ago' },
        { id: '3', name: 'Rahul Gupta', email: 'rahul@metro.com', phone: '7766554433', role: 'Student', status: 'Inactive', lastActive: '2 days ago' }
      ];
      setUsers(sampleUsers);
    }
  }, []);

  // Sync state to localStorage
  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(schools)); }, [schools]);
  useEffect(() => { localStorage.setItem(PLANS_STORAGE_KEY, JSON.stringify(plans)); }, [plans]);
  useEffect(() => { localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users)); }, [users]);

  const showToastMessage = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleAddPlan = (planData: Omit<Plan, 'id'>) => {
    const newPlan: Plan = {
      ...planData,
      id: Math.random().toString(36).substr(2, 9)
    };
    setPlans(prev => [...prev, newPlan]);
    showToastMessage('Plan added successfully! ✓');
  };

  const handleDeletePlan = (id: string) => {
    if (window.confirm('Delete this plan?')) {
      setPlans(prev => prev.filter(p => p.id !== id));
      showToastMessage('Plan deleted successfully! ✓');
    }
  };

  const handleSaveSchool = (schoolData: Omit<School, 'id'> & { id?: string }) => {
    if (schoolData.id) {
      setSchools(prev => prev.map(s => s.id === schoolData.id ? { ...schoolData as School } : s));
      showToastMessage('School updated successfully! ✓');
    } else {
      const newSchool: School = {
        ...schoolData,
        id: Math.random().toString(36).substr(2, 9)
      };
      setSchools(prev => [...prev, newSchool]);
      showToastMessage('School added successfully! ✓');
    }
    setCurrentPage('schools-list');
    setEditingSchool(undefined);
  };

  const handleDeleteSchool = (id: string) => {
    if (window.confirm('Are you sure?')) {
      setSchools(prev => prev.filter(s => s.id !== id));
      showToastMessage('School deleted successfully! ✓');
    }
  };

  const handleSaveUser = (userData: Omit<User, 'id'> & { id?: string }) => {
    if (userData.id) {
      setUsers(prev => prev.map(u => u.id === userData.id ? { ...userData as User } : u));
      showToastMessage('User updated successfully! ✓');
    } else {
      const newUser: User = {
        ...userData,
        id: Math.random().toString(36).substr(2, 9),
        lastActive: 'Just now'
      } as User;
      setUsers(prev => [...prev, newUser]);
      showToastMessage('User added successfully! ✓');
    }
    setCurrentPage('users-list');
    setEditingUser(undefined);
  };

  const handleDeleteUser = (id: string) => {
    if (window.confirm('Are you sure?')) {
      setUsers(prev => prev.filter(u => u.id !== id));
      showToastMessage('User deleted successfully! ✓');
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard schools={schools} onAddSchool={() => setCurrentPage('form')} />;
      case 'schools':
      case 'schools-list':
      case 'subscription-details':
        return (
          <SchoolsList 
            schools={schools} 
            searchQuery={searchQuery}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            onAddSchool={() => { setEditingSchool(undefined); setCurrentPage('form'); }} 
            onEditSchool={(s) => { setEditingSchool(s); setCurrentPage('form'); }}
            onDeleteSchool={handleDeleteSchool}
          />
        );
      case 'users-list':
        return (
          <UsersList 
            users={users}
            onAddUser={() => { setEditingUser(undefined); setCurrentPage('user-form'); }}
            onEditUser={(u) => { setEditingUser(u); setCurrentPage('user-form'); }}
            onDeleteUser={handleDeleteUser}
          />
        );
      case 'plans':
        return (
          <Plans 
            plans={plans} 
            onAddPlan={handleAddPlan} 
            onDeletePlan={handleDeletePlan} 
          />
        );
      case 'support':
        return <Support />;
      case 'terms':
        return <Terms />;
      case 'form':
        return (
          <SchoolForm 
            school={editingSchool}
            onSave={handleSaveSchool}
            onCancel={() => { setCurrentPage('schools-list'); setEditingSchool(undefined); }}
          />
        );
      case 'user-form':
        return (
          <UserForm 
            user={editingUser}
            onSave={handleSaveUser}
            onCancel={() => { setCurrentPage('users-list'); setEditingUser(undefined); }}
          />
        );
      default:
        return <div className="p-8 text-center text-text-light">This section is coming soon...</div>;
    }
  };

  return (
    <Layout 
      currentPage={currentPage} 
      setCurrentPage={setCurrentPage}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {renderPage()}
        </motion.div>
      </AnimatePresence>

      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className={`fixed bottom-6 right-6 p-4 rounded-lg shadow-lg border-l-4 z-[100] min-w-[300px] ${
              toast.type === 'success' 
                ? 'bg-success/10 border-success text-[#065f46]' 
                : 'bg-danger/10 border-danger text-[#991b1b]'
            }`}
          >
            <p className="font-semibold">{toast.message}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
}
