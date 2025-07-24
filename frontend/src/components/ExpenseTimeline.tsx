import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Coffee, Car, Home, Utensils, Gamepad2, Heart, GraduationCap } from 'lucide-react';

const expenses = [
  {
    id: 1,
    amount: -89.90,
    merchant: 'Supermercado Extra',
    category: 'Alimentação',
    icon: ShoppingBag,
    time: '2 horas atrás',
    description: 'Compras da semana',
    color: 'bg-green-500/20 text-green-400'
  },
  {
    id: 2,
    amount: -45.50,
    merchant: 'Posto Shell',
    category: 'Transporte',
    icon: Car,
    time: '5 horas atrás',
    description: 'Combustível',
    color: 'bg-blue-500/20 text-blue-400'
  },
  {
    id: 3,
    amount: -12.80,
    merchant: 'Starbucks',
    category: 'Alimentação',
    icon: Coffee,
    time: '1 dia atrás',
    description: 'Café da manhã',
    color: 'bg-green-500/20 text-green-400'
  },
  {
    id: 4,
    amount: -1200.00,
    merchant: 'Imobiliária Santos',
    category: 'Moradia',
    icon: Home,
    time: '2 dias atrás',
    description: 'Aluguel mensal',
    color: 'bg-purple-500/20 text-purple-400'
  },
  {
    id: 5,
    amount: -67.30,
    merchant: 'Restaurante Italiano',
    category: 'Alimentação',
    icon: Utensils,
    time: '3 dias atrás',
    description: 'Jantar romântico',
    color: 'bg-green-500/20 text-green-400'
  },
  {
    id: 6,
    amount: -199.90,
    merchant: 'Steam Store',
    category: 'Entretenimento',
    icon: Gamepad2,
    time: '4 dias atrás',
    description: 'Jogos digitais',
    color: 'bg-pink-500/20 text-pink-400'
  },
  {
    id: 7,
    amount: -150.00,
    merchant: 'Clínica Saúde+',
    category: 'Saúde',
    icon: Heart,
    time: '5 dias atrás',
    description: 'Consulta médica',
    color: 'bg-red-500/20 text-red-400'
  },
  {
    id: 8,
    amount: -89.99,
    merchant: 'Udemy',
    category: 'Educação',
    icon: GraduationCap,
    time: '1 semana atrás',
    description: 'Curso online',
    color: 'bg-indigo-500/20 text-indigo-400'
  },
];

export const ExpenseTimeline: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold text-light-text dark:text-dark-text font-editorial">Gastos Recentes</h2>
        <p className="text-light-text-secondary dark:text-dark-text-secondary mt-1">Suas últimas transações organizadas por categoria</p>
      </motion.div>

      {/* Expense List */}
      <div className="bg-light-surface/50 dark:bg-dark-surface/50 backdrop-blur-sm border border-light-border dark:border-dark-border rounded-2xl p-6 shadow-glass transition-colors duration-300">
        <div className="space-y-4">
          {expenses.map((expense, index) => (
            <motion.div
              key={expense.id}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.01, x: 5 }}
              className="flex items-center space-x-4 p-4 rounded-xl hover:bg-light-glass dark:hover:bg-dark-glass transition-all group relative duration-300"
            >
              {/* Category Icon */}
              <div className={`p-3 rounded-full ${expense.color}`}>
                <expense.icon className="w-5 h-5" />
              </div>

              {/* Expense Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <p className="font-medium text-light-text dark:text-dark-text font-editorial truncate">{expense.merchant}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${expense.color}`}>
                    {expense.category}
                  </span>
                  <span className="text-light-text-secondary dark:text-dark-text-secondary">•</span>
                  <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">{expense.time}</p>
                </div>
                <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary mt-1">{expense.description}</p>
              </div>

              {/* Amount */}
              <div className="text-right">
                <motion.p
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
                  className="font-bold font-editorial text-lg text-red-400"
                >
                  R$ {Math.abs(expense.amount).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </motion.p>
              </div>

              {/* Hover effect line */}
              <motion.div
                initial={{ width: 0 }}
                whileHover={{ width: '100%' }}
                className="absolute bottom-0 left-0 h-px bg-lime-accent/30"
              />
            </motion.div>
          ))}
        </div>

        {/* View More Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full mt-6 py-3 bg-light-glass dark:bg-dark-glass border border-light-border dark:border-dark-border rounded-xl text-light-text dark:text-dark-text hover:border-lime-accent/30 hover:text-lime-accent transition-all font-medium duration-300"
        >
          Ver Todas as Transações
        </motion.button>
      </div>
    </div>
  );
};