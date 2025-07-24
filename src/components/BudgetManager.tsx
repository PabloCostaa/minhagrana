import React from 'react';
import { motion } from 'framer-motion';
import { Target, TrendingUp, TrendingDown, Plus, Edit3 } from 'lucide-react';

const budgetCategories = [
  {
    id: 1,
    name: 'Alimentação',
    budget: 800,
    spent: 567.80,
    color: 'bg-green-500',
    lightColor: 'bg-green-500/20 text-green-400',
    icon: '🍽️'
  },
  {
    id: 2,
    name: 'Transporte',
    budget: 400,
    spent: 320.50,
    color: 'bg-blue-500',
    lightColor: 'bg-blue-500/20 text-blue-400',
    icon: '🚗'
  },
  {
    id: 3,
    name: 'Moradia',
    budget: 1500,
    spent: 1200.00,
    color: 'bg-purple-500',
    lightColor: 'bg-purple-500/20 text-purple-400',
    icon: '🏠'
  },
  {
    id: 4,
    name: 'Entretenimento',
    budget: 300,
    spent: 245.90,
    color: 'bg-pink-500',
    lightColor: 'bg-pink-500/20 text-pink-400',
    icon: '🎮'
  },
  {
    id: 5,
    name: 'Saúde',
    budget: 200,
    spent: 150.00,
    color: 'bg-red-500',
    lightColor: 'bg-red-500/20 text-red-400',
    icon: '❤️'
  },
  {
    id: 6,
    name: 'Educação',
    budget: 250,
    spent: 89.99,
    color: 'bg-indigo-500',
    lightColor: 'bg-indigo-500/20 text-indigo-400',
    icon: '📚'
  },
];

export const BudgetManager: React.FC = () => {
  const totalBudget = budgetCategories.reduce((sum, cat) => sum + cat.budget, 0);
  const totalSpent = budgetCategories.reduce((sum, cat) => sum + cat.spent, 0);

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
          <h2 className="text-3xl font-bold text-light-text dark:text-dark-text font-editorial">Gerenciar Orçamento</h2>
          <p className="text-light-text-secondary dark:text-dark-text-secondary mt-1">Defina e acompanhe seus limites de gastos por categoria</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center space-x-2 bg-lime-accent text-light-base dark:text-dark-base px-4 py-2 rounded-xl font-medium hover:shadow-glow transition-all"
        >
          <Plus className="w-5 h-5" />
          <span>Nova Categoria</span>
        </motion.button>
      </motion.div>

      {/* Budget Summary */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-gradient-to-br from-light-surface to-light-glass dark:from-dark-surface dark:to-dark-glass border border-light-border dark:border-dark-border rounded-2xl p-8 shadow-glass relative overflow-hidden transition-colors duration-300"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-lime-accent/5 rounded-full blur-3xl" />
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Target className="w-5 h-5 text-lime-accent" />
              <p className="text-light-text-secondary dark:text-dark-text-secondary text-sm uppercase tracking-wider">Orçamento Total</p>
            </div>
            <p className="text-3xl font-bold text-lime-accent font-editorial">
              R$ {totalBudget.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <TrendingDown className="w-5 h-5 text-red-400" />
              <p className="text-light-text-secondary dark:text-dark-text-secondary text-sm uppercase tracking-wider">Total Gasto</p>
            </div>
            <p className="text-3xl font-bold text-red-400 font-editorial">
              R$ {totalSpent.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <TrendingUp className="w-5 h-5 text-lime-accent" />
              <p className="text-light-text-secondary dark:text-dark-text-secondary text-sm uppercase tracking-wider">Restante</p>
            </div>
            <p className="text-3xl font-bold text-lime-accent font-editorial">
              R$ {(totalBudget - totalSpent).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Budget Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {budgetCategories.map((category, index) => {
          const percentage = (category.spent / category.budget) * 100;
          const isOverBudget = percentage > 100;
          
          return (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-light-surface/50 dark:bg-dark-surface/50 backdrop-blur-sm border border-light-border dark:border-dark-border rounded-xl p-6 hover:border-lime-accent/30 transition-all hover:shadow-glow duration-300"
            >
              {/* Category Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{category.icon}</span>
                  <div>
                    <h3 className="font-bold text-light-text dark:text-dark-text font-editorial">{category.name}</h3>
                    <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                      R$ {category.spent.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} / R$ {category.budget.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`text-sm font-medium ${isOverBudget ? 'text-red-400' : 'text-lime-accent'}`}>
                    {percentage.toFixed(0)}%
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-1 rounded-full hover:bg-light-glass dark:hover:bg-dark-glass transition-colors"
                  >
                    <Edit3 className="w-4 h-4 text-light-text-secondary dark:text-dark-text-secondary" />
                  </motion.button>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="w-full bg-light-glass dark:bg-dark-glass rounded-full h-3">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(percentage, 100)}%` }}
                    transition={{ duration: 1, delay: 0.4 + index * 0.1 }}
                    className={`h-3 rounded-full ${
                      isOverBudget 
                        ? 'bg-red-400' 
                        : percentage > 80 
                          ? 'bg-yellow-400' 
                          : category.color
                    }`}
                  />
                </div>
                
                {isOverBudget && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    className="flex items-center space-x-1 text-red-400 text-xs"
                  >
                    <TrendingUp className="w-3 h-3" />
                    <span>R$ {(category.spent - category.budget).toLocaleString('pt-BR', { minimumFractionDigits: 2 })} acima do orçamento</span>
                  </motion.div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};