import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Download, TrendingUp, TrendingDown, Target, DollarSign } from 'lucide-react';

const monthlyComparison = [
  { month: 'Jan', spent: 3240, budget: 4000, savings: 760 },
  { month: 'Fev', spent: 2890, budget: 4000, savings: 1110 },
  { month: 'Mar', spent: 4150, budget: 4000, savings: -150 },
  { month: 'Abr', spent: 3680, budget: 4000, savings: 320 },
];

const topCategories = [
  { name: 'Alimentação', amount: 1247.80, change: +5.2 },
  { name: 'Moradia', amount: 1200.00, change: 0 },
  { name: 'Transporte', amount: 456.50, change: -8.1 },
  { name: 'Entretenimento', amount: 345.90, change: +12.3 },
];

export const Reports: React.FC = () => {
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
          <h2 className="text-3xl font-bold text-light-text dark:text-dark-text font-editorial">Relatórios</h2>
          <p className="text-light-text-secondary dark:text-dark-text-secondary mt-1">Análise completa dos seus hábitos financeiros</p>
        </div>
        <div className="flex items-center space-x-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 bg-light-glass dark:bg-dark-glass border border-light-border dark:border-dark-border px-4 py-2 rounded-xl hover:border-lime-accent/30 transition-all duration-300"
          >
            <Calendar className="w-5 h-5 text-light-text dark:text-dark-text" />
            <span className="text-sm text-light-text dark:text-dark-text">Abril 2024</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 bg-lime-accent text-light-base dark:text-dark-base px-4 py-2 rounded-xl font-medium hover:shadow-glow transition-all"
          >
            <Download className="w-5 h-5" />
            <span>Exportar PDF</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { 
            title: 'Gasto Total', 
            value: 'R$ 3.680,25', 
            change: '+12%', 
            positive: false, 
            icon: DollarSign,
            color: 'text-red-400'
          },
          { 
            title: 'Economia', 
            value: 'R$ 319,75', 
            change: '-15%', 
            positive: false, 
            icon: Target,
            color: 'text-lime-accent'
          },
          { 
            title: 'Maior Categoria', 
            value: 'Alimentação', 
            change: '+5%', 
            positive: true, 
            icon: TrendingUp,
            color: 'text-green-400'
          },
          { 
            title: 'Meta Atingida', 
            value: '92%', 
            change: '+8%', 
            positive: true, 
            icon: Target,
            color: 'text-lime-accent'
          },
        ].map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-light-surface/50 dark:bg-dark-surface/50 backdrop-blur-sm border border-light-border dark:border-dark-border rounded-xl p-6 transition-colors duration-300"
          >
            <div className="flex items-center justify-between mb-2">
              <metric.icon className={`w-5 h-5 ${metric.color}`} />
              <div className={`flex items-center space-x-1 ${metric.positive ? 'text-lime-accent' : 'text-red-400'}`}>
                {metric.positive ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                <span className="text-sm">{metric.change}</span>
              </div>
            </div>
            <p className="text-light-text-secondary dark:text-dark-text-secondary text-sm mb-1">{metric.title}</p>
            <p className={`text-2xl font-bold font-editorial ${metric.color}`}>{metric.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Monthly Comparison Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-light-surface/50 dark:bg-dark-surface/50 backdrop-blur-sm border border-light-border dark:border-dark-border rounded-2xl p-6 shadow-glass transition-colors duration-300"
      >
        <h3 className="text-xl font-bold text-light-text dark:text-dark-text font-editorial mb-6">Comparação Mensal</h3>
        
        <div className="space-y-6">
          {monthlyComparison.map((month, index) => (
            <motion.div
              key={month.month}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              className="space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-light-text dark:text-dark-text font-medium">{month.month}</span>
                <div className="flex items-center space-x-4 text-sm">
                  <span className="text-red-400">
                    Gasto: R$ {month.spent.toLocaleString('pt-BR')}
                  </span>
                  <span className="text-light-text-secondary dark:text-dark-text-secondary">
                    Orçamento: R$ {month.budget.toLocaleString('pt-BR')}
                  </span>
                  <span className={month.savings >= 0 ? 'text-lime-accent' : 'text-red-400'}>
                    {month.savings >= 0 ? 'Economia' : 'Excesso'}: R$ {Math.abs(month.savings).toLocaleString('pt-BR')}
                  </span>
                </div>
              </div>
              
              <div className="relative">
                <div className="w-full bg-light-glass dark:bg-dark-glass rounded-full h-3">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min((month.spent / month.budget) * 100, 100)}%` }}
                    transition={{ duration: 1, delay: 0.8 + index * 0.1 }}
                    className={`h-3 rounded-full ${
                      month.spent > month.budget 
                        ? 'bg-red-400' 
                        : month.spent > month.budget * 0.8 
                          ? 'bg-yellow-400' 
                          : 'bg-lime-accent'
                    }`}
                  />
                </div>
                <div className="absolute top-0 right-0 w-1 h-3 bg-light-text-secondary dark:text-dark-text-secondary opacity-50 rounded-full" />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Top Categories */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="bg-light-surface/50 dark:bg-dark-surface/50 backdrop-blur-sm border border-light-border dark:border-dark-border rounded-2xl p-6 shadow-glass transition-colors duration-300"
      >
        <h3 className="text-xl font-bold text-light-text dark:text-dark-text font-editorial mb-6">Principais Categorias</h3>
        
        <div className="space-y-4">
          {topCategories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1.0 + index * 0.1 }}
              className="flex items-center justify-between p-4 rounded-xl hover:bg-light-glass dark:hover:bg-dark-glass transition-all duration-300"
            >
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-lime-accent rounded-full" />
                <span className="text-light-text dark:text-dark-text font-medium">{category.name}</span>
              </div>
              
              <div className="flex items-center space-x-4">
                <span className="text-light-text dark:text-dark-text font-bold">
                  R$ {category.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
                <div className={`flex items-center space-x-1 ${category.change >= 0 ? 'text-red-400' : 'text-lime-accent'}`}>
                  {category.change >= 0 ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  <span className="text-sm">{category.change > 0 ? '+' : ''}{category.change}%</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.2 }}
        className="bg-gradient-to-r from-light-surface/80 to-light-glass dark:from-dark-surface/80 dark:to-dark-glass border border-light-border dark:border-dark-border rounded-2xl p-6 shadow-glass transition-colors duration-300"
      >
        <h3 className="text-xl font-bold text-light-text dark:text-dark-text font-editorial mb-4">Insights Inteligentes</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-lime-accent/10 border border-lime-accent/20 rounded-xl">
            <h4 className="font-medium text-lime-accent mb-2">💡 Dica de Economia</h4>
            <p className="text-sm text-light-text dark:text-dark-text">
              Você gastou 15% a mais em entretenimento este mês. Considere definir um limite semanal.
            </p>
          </div>
          <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
            <h4 className="font-medium text-blue-400 mb-2">📊 Padrão Identificado</h4>
            <p className="text-sm text-light-text dark:text-dark-text">
              Seus gastos com alimentação são consistentemente altos nos fins de semana.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};