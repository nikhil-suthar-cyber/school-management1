import React from 'react';
import { User, Page } from '../types';
import { Plus, Edit2, Trash2, User as UserIcon, Mail, Shield, Smartphone, Circle } from 'lucide-react';
import { motion } from 'motion/react';

interface UsersListProps {
  users: User[];
  onAddUser: () => void;
  onEditUser: (user: User) => void;
  onDeleteUser: (id: string) => void;
}

export const UsersList: React.FC<UsersListProps> = ({ users, onAddUser, onEditUser, onDeleteUser }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-text-color">User Management</h2>
        <button 
          onClick={onAddUser}
          className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2 text-sm transition-all shadow-sm"
        >
          <Plus size={18} />
          Add New User
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-light-gray border-b border-border">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-text-light uppercase tracking-wider">User Details</th>
                <th className="px-6 py-4 text-xs font-bold text-text-light uppercase tracking-wider">Role</th>
                <th className="px-6 py-4 text-xs font-bold text-text-light uppercase tracking-wider">Contact</th>
                <th className="px-6 py-4 text-xs font-bold text-text-light uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-text-light uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {users.map((user, index) => (
                <motion.tr 
                  key={user.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-light-gray/30 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-text-color">{user.name}</div>
                        <div className="text-[10px] text-text-light">Last Active: {user.lastActive}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <Shield size={14} className="text-text-light" />
                      <span className="text-sm text-text-color">{user.role}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="space-y-1">
                      <div className="text-xs text-text-color flex items-center gap-1.5">
                        <Mail size={12} className="text-text-light" />
                        {user.email}
                      </div>
                      <div className="text-xs text-text-color flex items-center gap-1.5">
                        <Smartphone size={12} className="text-text-light" />
                        {user.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`
                      px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1.5 w-fit
                      ${user.status === 'Active' ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'}
                    `}>
                      <Circle size={8} fill="currentColor" />
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => onEditUser(user)}
                        className="p-1.5 hover:bg-primary/10 text-text-light hover:text-primary rounded-md transition-all"
                        title="Edit User"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button 
                        onClick={() => onDeleteUser(user.id)}
                        className="p-1.5 hover:bg-danger/10 text-text-light hover:text-danger rounded-md transition-all"
                        title="Delete User"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-text-light text-sm italic">
                    No users found. Add your first user to get started.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
