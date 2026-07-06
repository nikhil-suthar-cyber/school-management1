import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  School, 
  FileText, 
  Box, 
  LifeBuoy, 
  Settings, 
  Menu, 
  Bell, 
  User, 
  Users,
  CreditCard,
  Search, 
  ChevronDown,
  BookOpen,
  FileCheck
} from 'lucide-react';
import { Page } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const Layout: React.FC<LayoutProps> = ({ 
  children, 
  currentPage, 
  setCurrentPage,
  searchQuery,
  setSearchQuery
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSchoolsExpanded, setIsSchoolsExpanded] = useState(true);

  const navItems = [
    { id: 'dashboard', label: 'DASHBOARD', icon: LayoutDashboard },
    { 
      id: 'schools', 
      label: 'SCHOOLS LIST', 
      icon: School,
      subItems: [
        { id: 'schools-list', label: 'School List', icon: School },
        { id: 'users-list', label: 'User List', icon: Users },
        { id: 'subscription-details', label: 'Subscription Details', icon: CreditCard },
      ]
    },
    { id: 'plans', label: 'PLANS', icon: FileText },
    { id: 'overview', label: 'OVERVIEW', icon: Box },
    { id: 'support', label: 'SUPPORT', icon: LifeBuoy },
    { id: 'terms', label: 'TERMS & CONDITIONS', icon: FileCheck },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary to-primary-dark border-b border-black/10 flex justify-between items-center px-4 md:px-6 h-16 sticky top-0 z-50 shadow-md">
        <div className="flex items-center gap-5">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="md:hidden text-white bg-white/20 p-2 rounded-md hover:bg-white/30 transition-all"
          >
            <Menu size={24} />
          </button>
          
          <div className="flex items-center gap-2 text-white font-bold text-lg md:text-xl tracking-tight">
            <BookOpen size={24} />
            <span className="hidden sm:inline">School Management</span>
          </div>

          <div className="hidden md:block">
            <button className="bg-white/15 text-white border border-white/30 px-4 py-2 rounded-md flex items-center gap-2 text-sm font-medium hover:bg-white/25 transition-all">
              Super Admin
              <ChevronDown size={14} />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4 md:gap-6">
          <div className="hidden md:flex items-center bg-white/15 border border-white/30 rounded-lg px-3 py-2 gap-2 transition-all focus-within:bg-white/25 focus-within:border-white/50">
            <input 
              type="text" 
              placeholder="Search schools..." 
              className="bg-transparent border-none outline-none text-white text-sm w-48 lg:w-64 placeholder:text-white/70"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search size={16} className="text-white/80" />
          </div>

          <div className="flex items-center gap-3 md:gap-4 text-white">
            <span className="flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-full bg-white/10 hover:bg-white/20 hover:-translate-y-0.5 transition-all cursor-pointer">
              <Bell size={18} />
            </span>
            <span className="flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-full bg-white/10 hover:bg-white/20 hover:-translate-y-0.5 transition-all cursor-pointer" title="Support">
              <LifeBuoy size={18} />
            </span>
            <span className="flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-full bg-white/10 hover:bg-white/20 hover:-translate-y-0.5 transition-all cursor-pointer">
              <User size={18} />
            </span>
          </div>
        </div>
      </header>

      <div className="flex flex-1 relative">
        {/* Sidebar */}
        <aside className={`
          fixed md:sticky top-16 h-[calc(100vh-64px)] w-64 bg-white border-r border-border py-4 z-40 transition-transform duration-300 shadow-sm overflow-y-auto
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}>
          <nav className="flex flex-col gap-1 px-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              const hasSubItems = !!item.subItems;
              const isActive = currentPage === item.id || (item.id === 'schools' && (currentPage === 'form' || currentPage.startsWith('schools-') || currentPage === 'users-list' || currentPage === 'subscription-details'));
              
              return (
                <div key={item.id} className="flex flex-col gap-1">
                  <button
                    onClick={() => {
                      if (hasSubItems) {
                        setIsSchoolsExpanded(!isSchoolsExpanded);
                        if (!isActive) setCurrentPage('schools' as Page);
                      } else {
                        setCurrentPage(item.id as Page);
                        setIsSidebarOpen(false);
                      }
                    }}
                    className={`
                      flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-all group border-l-3 w-full
                      ${isActive 
                        ? 'bg-gradient-to-r from-primary/10 to-secondary/5 border-primary text-primary font-semibold' 
                        : 'text-dark-gray hover:bg-light-gray hover:text-primary border-transparent'}
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={18} className={isActive ? 'text-primary' : 'text-dark-gray group-hover:text-primary'} />
                      {item.label}
                    </div>
                    {hasSubItems && (
                      <ChevronDown size={14} className={`transition-transform duration-200 ${isSchoolsExpanded ? 'rotate-180' : ''}`} />
                    )}
                  </button>

                  {/* Sub-menu items */}
                  {hasSubItems && (
                    <motion.div 
                      initial={false}
                      animate={{ height: isSchoolsExpanded ? 'auto' : 0, opacity: isSchoolsExpanded ? 1 : 0 }}
                      className="overflow-hidden flex flex-col gap-1 pl-6"
                    >
                      {item.subItems?.map((subItem) => {
                        const SubIcon = subItem.icon;
                        const isSubActive = currentPage === subItem.id || (subItem.id === 'schools-list' && currentPage === 'schools');
                        return (
                          <button
                            key={subItem.id}
                            onClick={() => {
                              setCurrentPage(subItem.id as Page);
                              setIsSidebarOpen(false);
                            }}
                            className={`
                              flex items-center gap-3 px-4 py-2.5 rounded-lg text-xs font-medium transition-all group
                              ${isSubActive 
                                ? 'text-primary bg-primary/5 font-bold' 
                                : 'text-text-light hover:text-primary hover:bg-light-gray'}
                            `}
                          >
                            <SubIcon size={14} />
                            {subItem.label}
                          </button>
                        );
                      })}
                    </motion.div>
                  )}
                </div>
              );
            })}
          </nav>
        </aside>

        {/* Backdrop for mobile sidebar */}
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-black/30 z-30 md:hidden"
            />
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8 lg:p-10 overflow-x-hidden">
          {children}
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-border text-center py-6 px-4 text-xs md:text-sm text-text-light">
        <p>© {new Date().getFullYear()} School Management System. All Rights Reserved.</p>
      </footer>
    </div>
  );
};
