import React from 'react';
import { motion } from 'framer-motion';
import { PieChart, BarChart3, TrendingUp, TrendingDown } from 'lucide-react';

const categoryData = [
  {
    name: 'Alimentação',
    amount: 1247.80,
    percentage: 34.2,
    change: +5.2,
    color: 'bg-green-500',
    icon: '🍽️',
    transactions: 23
  },
  {
    name: 'Moradia',
    amount: 1200.00,
    percentage: 32.9,
    change: 0,
    color: 'bg-purple-500',
    icon: '🏠',
    transactions: 1
  },
  {
    name: 'Transporte',
    amount: 456.50,
    percentage: 12.5,
    change: -8.1,
    color: 'bg-blue-500',
    icon: '🚗',
    transactions: 8
  },
  {
    name: 'Entretenimento',
    amount: 345.90,
    percentage: 9.5,
    change: +12.3,
    color: 'bg-pink-500',
    icon: '🎮',
    transactions: 12
  },
  {
    name: 'Saúde',
    amount: 250.00,
    percentage: 6.9,
    change: +2.1,
    color: 'bg-red-500',
    icon: '❤️',
    transactions: 3
  },
  {
    name: 'Educação',
    amount: 149.99,
    percentage: 4.1,
    change: -15.2,
    color: 'bg-indigo-500',
    icon: '📚',
    transactions: 2
  },
];

export const ExpenseCategories: React.FC = () => {
  const totalAmount = categoryData.reduce((sum, cat) => sum + cat.amount, 0);

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
          <h2 className="text-3xl font-bold text-light-text dark:text-dark-text font-editorial">Categorias de Gastos</h2>
          <p className="text-light-text-secondary dark:text-dark-text-secondary mt-1">Análise detalhada dos seus gastos por categoria</p>
        </div>
        <div className="flex items-center space-x-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-3 bg-light-glass dark:bg-dark-glass rounded-full hover:bg-lime-accent/10 transition-colors duration-300"
          >
            <PieChart className="w-5 h-5 text-light-text dark:text-dark-text" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-3 bg-light-glass dark:bg-dark-glass rounded-full hover:bg-lime-accent/10 transition-colors duration-300"
          >
            <BarChart3 className="w-5 h-5 text-light-text dark:text-dark-text" />
          </motion.button>
        </div>
      </motion.div>

      {/* Total Summary */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-gradient-to-br from-light-surface to-light-glass dark:from-dark-surface dark:to-dark-glass border border-light-border dark:border-dark-border rounded-2xl p-8 shadow-glass relative overflow-hidden transition-colors duration-300"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-lime-accent/5 rounded-full blur-3xl" />
        <div className="relative text-center">
          <p className="text-light-text-secondary dark:text-dark-text-secondary text-sm uppercase tracking-wider mb-2">Total Gasto Este Mês</p>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3, type: "spring" }}
            className="flex items-center justify-center space-x-2"
          >
            <span className="text-4xl font-bold text-lime-accent font-editorial">
              R$ {totalAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </span>
          </motion.div>
          <div className="flex items-center justify-center space-x-2 mt-3">
            <TrendingUp className="w-4 h-4 text-lime-accent" />
            <span className="text-lime-accent text-sm">Distribuído em {categoryData.length} categorias</span>
          </div>
        </div>
      </motion.div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categoryData.map((category, index) => (
          <motion.div
            key={category.name}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
            whileHover={{ scale: 1.02, y: -5 }}
            className="bg-light-surface/50 dark:bg-dark-surface/50 backdrop-blur-sm border border-light-border dark:border-dark-border rounded-xl p-6 hover:border-lime-accent/30 transition-all hover:shadow-glow group duration-300"
          >
            {/* Category Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{category.icon}</span>
                <div>
                  <h3 className="font-bold text-light-text dark:text-dark-text font-editorial">{category.name}</h3>
                  <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary">{category.transactions} transações</p>
                </div>
              </div>
              <div className={`flex items-center space-x-1 ${category.change >= 0 ? 'text-lime-accent' : 'text-red-400'}`}>
                {category.change >= 0 ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                <span className="text-sm">{category.change > 0 ? '+' : ''}{category.change}%</span>
              </div>
            </div>

            {/* Amount and Percentage */}
            <div className="space-y-3">
              <motion.p
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                className="text-2xl font-bold text-light-text dark:text-dark-text font-editorial"
              >
                R$ {category.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </motion.p>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-light-text-secondary dark:text-dark-text-secondary">{category.percentage}% do total</span>
                <span className="text-light-text dark:text-dark-text font-medium">
                  R$ {(category.amount / category.transactions).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}/transação
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-light-glass dark:bg-dark-glass rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${category.percentage}%` }}
                  transition={{ duration: 1, delay: 0.6 + index * 0.1 }}
                  className={`h-2 ${category.color} rounded-full opacity-70`}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="bg-light-surface/50 dark:bg-dark-surface/50 backdrop-blur-sm border border-light-border dark:border-dark-border rounded-2xl p-6 shadow-glass transition-colors duration-300"
      >
        <h3 className="text-xl font-bold text-light-text dark:text-dark-text font-editorial mb-4">Ações Rápidas</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="p-4 bg-light-glass dark:bg-dark-glass border border-light-border dark:border-dark-border rounded-xl text-left hover:border-lime-accent/30 hover:text-lime-accent transition-all duration-300"
          >
            <h4 className="font-medium mb-1">Definir Meta</h4>
            <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">Estabeleça limites para cada categoria</p>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="p-4 bg-light-glass dark:bg-dark-glass border border-light-border dark:border-dark-border rounded-xl text-left hover:border-lime-accent/30 hover:text-lime-accent transition-all duration-300"
          >
            <h4 className="font-medium mb-1">Exportar Dados</h4>
            <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">Baixe relatório detalhado em PDF</p>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="p-4 bg-light-glass dark:bg-dark-glass border border-light-border dark:border-dark-border rounded-xl text-left hover:border-lime-accent/30 hover:text-lime-accent transition-all duration-300"
          >
            <h4 className="font-medium mb-1">Comparar Meses</h4>
            <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">Veja a evolução dos seus gastos</p>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};