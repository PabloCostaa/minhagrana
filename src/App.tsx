import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './contexts/ThemeContext';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { ExpenseOverview } from './components/ExpenseOverview';
import { ExpenseTimeline } from './components/ExpenseTimeline';
import { BudgetManager } from './components/BudgetManager';
import { ExpenseCategories } from './components/ExpenseCategories';
import { Reports } from './components/Reports';
import { CTAStrip } from './components/CTAStrip';

function App() {
  const [activeSection, setActiveSection] = useState('overview');

  const renderMainContent = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <div className="space-y-8">
            <ExpenseOverview />
            <ExpenseTimeline />
          </div>
        );
      case 'categories':
        return <ExpenseCategories />;
      case 'budget':
        return <BudgetManager />;
      case 'reports':
        return <Reports />;
      case 'add-expense':
        return (
          <div className="flex items-center justify-center h-96">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <h2 className="text-2xl font-bold text-light-text dark:text-dark-text font-editorial mb-4">Adicionar Despesa</h2>
              <p className="text-light-text-secondary dark:text-dark-text-secondary">Em breve - Formulário rápido para adicionar novas despesas</p>
            </motion.div>
          </div>
        );
      case 'settings':
        return (
          <div className="flex items-center justify-center h-96">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <h2 className="text-2xl font-bold text-light-text dark:text-dark-text font-editorial mb-4">Configurações</h2>
              <p className="text-light-text-secondary dark:text-dark-text-secondary">Em breve - Configurações da conta e preferências</p>
            </motion.div>
          </div>
        );
      default:
        return <ExpenseOverview />;
    }
  };

  return (
    <ThemeProvider>
      <AppContent activeSection={activeSection} setActiveSection={setActiveSection} renderMainContent={renderMainContent} />
    </ThemeProvider>
  );
}

const AppContent: React.FC<{
  activeSection: string;
  setActiveSection: (section: string) => void;
  renderMainContent: () => React.ReactNode;
}> = ({ activeSection, setActiveSection, renderMainContent }) => {
  return (
    <div className="min-h-screen bg-light-base dark:bg-dark-base text-light-text dark:text-dark-text font-editorial transition-colors duration-300">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-lime-accent/5 dark:bg-lime-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-lime-accent/3 dark:bg-lime-accent/3 rounded-full blur-3xl"></div>
      </div>

      <div className="flex h-screen relative">
        {/* Sidebar */}
        <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0">
          <TopBar />
          
          {/* Content Area */}
          <div className="flex-1 overflow-auto pb-20">
            <div className="p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSection}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  {renderMainContent()}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Strip */}
      <CTAStrip />
    </div>
  );
};

export default App;