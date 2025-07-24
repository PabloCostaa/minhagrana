import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Eye, EyeOff, DollarSign, Calendar } from 'lucide-react';

const monthlyData = [
  { month: 'Janeiro', spent: 3240.50, budget: 4000, savings: 759.50 },
  { month: 'Fevereiro', spent: 2890.30, budget: 4000, savings: 1109.70 },
  { month: 'Março', spent: 4150.80, budget: 4000, savings: -150.80 },
  { month: 'Abril', spent: 3680.25, budget: 4000, savings: 319.75 },
];

const currentMonth = monthlyData[monthlyData.length - 1];

export const ExpenseOverview: React.FC = () => {
  const [showBalances, setShowBalances] = React.useState(true);

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between"
      >
        <div>
          <h2 className="text-3xl font-bold text-light-text dark:text-dark-text font-editorial">Visão Geral</h2>
          <p className="text-light-text-secondary dark:text-dark-text-secondary mt-1">Resumo dos seus gastos mensais</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowBalances(!showBalances)}
          className="p-3 bg-light-glass dark:bg-dark-glass rounded-full hover:bg-lime-accent/10 transition-colors duration-300"
        >
          {showBalances ? (
            <Eye className="w-5 h-5 text-light-text dark:text-dark-text" />
          ) : (
            <EyeOff className="w-5 h-5 text-light-text dark:text-dark-text" />
          )}
        </motion.button>
      </motion.div>

      {/* Main Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Spent This Month */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-gradient-to-br from-light-surface to-light-glass dark:from-dark-surface dark:to-dark-glass border border-light-border dark:border-dark-border rounded-2xl p-6 shadow-glass relative overflow-hidden transition-colors duration-300"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/5 rounded-full blur-2xl" />
          <div className="relative">
            <div className="flex items-center space-x-2 mb-2">
              <DollarSign className="w-5 h-5 text-red-400" />
              <p className="text-light-text-secondary dark:text-dark-text-secondary text-sm uppercase tracking-wider">Gasto Este Mês</p>
            </div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.7, delay: 0.3, type: "spring" }}
              className="flex items-baseline space-x-2"
            >
              <span className="text-3xl font-bold text-red-400 font-editorial">
                {showBalances ? `R$ ${currentMonth.spent.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : '••••••••'}
              </span>
            </motion.div>
            <div className="flex items-center space-x-2 mt-2">
              <TrendingUp className="w-4 h-4 text-red-400" />
              <span className="text-red-400 text-sm">+12% vs mês anterior</span>
            </div>
          </div>
        </motion.div>

        {/* Budget Remaining */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-gradient-to-br from-light-surface to-light-glass dark:from-dark-surface dark:to-dark-glass border border-light-border dark:border-dark-border rounded-2xl p-6 shadow-glass relative overflow-hidden transition-colors duration-300"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-lime-accent/5 rounded-full blur-2xl" />
          <div className="relative">
            <div className="flex items-center space-x-2 mb-2">
              <Calendar className="w-5 h-5 text-lime-accent" />
              <p className="text-light-text-secondary dark:text-dark-text-secondary text-sm uppercase tracking-wider">Orçamento Restante</p>
            </div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.7, delay: 0.4, type: "spring" }}
              className="flex items-baseline space-x-2"
            >
              <span className="text-3xl font-bold text-lime-accent font-editorial">
                {showBalances ? `R$ ${Math.max(0, currentMonth.budget - currentMonth.spent).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : '••••••••'}
              </span>
            </motion.div>
            <div className="flex items-center space-x-2 mt-2">
              <span className="text-lime-accent text-sm">{Math.round((currentMonth.budget - currentMonth.spent) / currentMonth.budget * 100)}% do orçamento</span>
            </div>
          </div>
        </motion.div>

        {/* Savings This Month */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-gradient-to-br from-light-surface to-light-glass dark:from-dark-surface dark:to-dark-glass border border-light-border dark:border-dark-border rounded-2xl p-6 shadow-glass relative overflow-hidden transition-colors duration-300"
        >
          <div className={`absolute top-0 right-0 w-24 h-24 ${currentMonth.savings >= 0 ? 'bg-lime-accent/5' : 'bg-red-500/5'} rounded-full blur-2xl`} />
          <div className="relative">
            <div className="flex items-center space-x-2 mb-2">
              {currentMonth.savings >= 0 ? (
                <TrendingUp className="w-5 h-5 text-lime-accent" />
              ) : (
                <TrendingDown className="w-5 h-5 text-red-400" />
              )}
              <p className="text-light-text-secondary dark:text-dark-text-secondary text-sm uppercase tracking-wider">
                {currentMonth.savings >= 0 ? 'Economia' : 'Excesso'}
              </p>
            </div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.7, delay: 0.5, type: "spring" }}
              className="flex items-baseline space-x-2"
            >
              <span className={`text-3xl font-bold font-editorial ${currentMonth.savings >= 0 ? 'text-lime-accent' : 'text-red-400'}`}>
                {showBalances ? `R$ ${Math.abs(currentMonth.savings).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : '••••••••'}
              </span>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Budget Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-light-surface/50 dark:bg-dark-surface/50 backdrop-blur-sm border border-light-border dark:border-dark-border rounded-2xl p-6 shadow-glass transition-colors duration-300"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-light-text dark:text-dark-text font-editorial">Progresso do Orçamento</h3>
          <span className="text-sm text-light-text-secondary dark:text-dark-text-secondary">Abril 2024</span>
        </div>
        
        <div className="space-y-4">
          <div className="flex justify-between text-sm">
            <span className="text-light-text-secondary dark:text-dark-text-secondary">Gasto</span>
            <span className="text-light-text dark:text-dark-text font-medium">
              R$ {currentMonth.spent.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} / R$ {currentMonth.budget.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </span>
          </div>
          
          <div className="w-full bg-light-glass dark:bg-dark-glass rounded-full h-3">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min((currentMonth.spent / currentMonth.budget) * 100, 100)}%` }}
              transition={{ duration: 1.5, delay: 0.6 }}
              className={`h-3 rounded-full ${
                currentMonth.spent > currentMonth.budget 
                  ? 'bg-red-400' 
                  : currentMonth.spent > currentMonth.budget * 0.8 
                    ? 'bg-yellow-400' 
                    : 'bg-lime-accent'
              }`}
            />
          </div>
          
          <div className="flex justify-between text-xs text-light-text-secondary dark:text-dark-text-secondary">
            <span>0%</span>
            <span>50%</span>
            <span>100%</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};