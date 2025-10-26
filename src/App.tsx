import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './contexts/ThemeContext';
import { Sidebar } from './components/Layout/Sidebar';
import { Header } from './components/Layout/Header';
import { Dashboard } from './components/Dashboard/Dashboard';
import { ProjectList } from './components/Projects/ProjectList';
import { TaskBoard } from './components/Tasks/TaskBoard';
import { TeamDirectory } from './components/Team/TeamDirectory';
import { mockTeamMembers } from './data/mockData';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState('dashboard');
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const currentUser = {
    name: 'Sarah Chen',
    avatar: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=150&h=150&fit=crop&crop=face'
  };

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard />;
      case 'projects':
        return <ProjectList />;
      case 'tasks':
        return <TaskBoard />;
      case 'team':
        return <TeamDirectory />;
      case 'chat':
        return <div className="p-6"><h1 className="text-header font-semibold text-charcoal-900 dark:text-white">Chat & Notes</h1><p className="text-charcoal-600 dark:text-gray-400 mt-2">Coming soon...</p></div>;
      case 'files':
        return <div className="p-6"><h1 className="text-header font-semibold text-charcoal-900 dark:text-white">Files & Resources</h1><p className="text-charcoal-600 dark:text-gray-400 mt-2">Coming soon...</p></div>;
      case 'calendar':
        return <div className="p-6"><h1 className="text-header font-semibold text-charcoal-900 dark:text-white">Calendar</h1><p className="text-charcoal-600 dark:text-gray-400 mt-2">Coming soon...</p></div>;
      case 'client':
        return <div className="p-6"><h1 className="text-header font-semibold text-charcoal-900 dark:text-white">Client View</h1><p className="text-charcoal-600 dark:text-gray-400 mt-2">Coming soon...</p></div>;
      case 'settings':
        return <div className="p-6"><h1 className="text-header font-semibold text-charcoal-900 dark:text-white">Settings</h1><p className="text-charcoal-600 dark:text-gray-400 mt-2">Coming soon...</p></div>;
      default:
        return <Dashboard />;
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-sand-50 dark:bg-dark-950 flex transition-colors duration-300">
        {/* Mobile Sidebar Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
          )}
        </AnimatePresence>

        {/* Sidebar */}
        <div className={`${isMobileMenuOpen ? 'fixed' : 'hidden'} lg:relative lg:block inset-y-0 left-0 z-50 lg:z-0`}>
          <Sidebar
            activeView={activeView}
            onViewChange={(view) => {
              setActiveView(view);
              setIsMobileMenuOpen(false);
            }}
            isExpanded={sidebarExpanded}
            onToggle={() => setSidebarExpanded(!sidebarExpanded)}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header
            onMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            currentUser={currentUser}
          />
          
          <main className="flex-1 overflow-y-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeView}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default App;
