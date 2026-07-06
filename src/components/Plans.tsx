import React, { useState } from 'react';
import { Plan } from '../types';
import { Plus, Check, Trash2, DollarSign } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PlansProps {
  plans: Plan[];
  onAddPlan: (plan: Omit<Plan, 'id'>) => void;
  onDeletePlan: (id: string) => void;
}

export const Plans: React.FC<PlansProps> = ({ plans, onAddPlan, onDeletePlan }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newPlan, setNewPlan] = useState<Omit<Plan, 'id'>>({
    name: '',
    price: 0,
    features: [''],
    billingCycle: 'Monthly'
  });

  const handleAddFeature = () => {
    setNewPlan(prev => ({ ...prev, features: [...prev.features, ''] }));
  };

  const handleFeatureChange = (index: number, value: string) => {
    const updatedFeatures = [...newPlan.features];
    updatedFeatures[index] = value;
    setNewPlan(prev => ({ ...prev, features: updatedFeatures }));
  };

  const handleRemoveFeature = (index: number) => {
    setNewPlan(prev => ({ ...prev, features: prev.features.filter((_, i) => i !== index) }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPlan.name && newPlan.price > 0) {
      onAddPlan({
        ...newPlan,
        features: newPlan.features.filter(f => f.trim() !== '')
      });
      setIsAdding(false);
      setNewPlan({ name: '', price: 0, features: [''], billingCycle: 'Monthly' });
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div className="space-y-2">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1e293b]">Subscription Plans</h2>
          <p className="text-sm text-text-light">Create and manage your school subscription plans.</p>
        </div>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="bg-primary text-white px-6 py-2.5 rounded-lg font-semibold flex items-center gap-2 shadow-md hover:shadow-primary/30 hover:-translate-y-0.5 transition-all active:scale-95"
        >
          {isAdding ? 'Cancel' : <><Plus size={18} /> Add Plan</>}
        </button>
      </div>

      <AnimatePresence>
        {isAdding && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-white rounded-xl shadow-sm border border-border p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-text-color">Plan Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Premium" 
                      required
                      value={newPlan.name}
                      onChange={e => setNewPlan(prev => ({ ...prev, name: e.target.value }))}
                      className="border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-3 focus:ring-primary/10 transition-all"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-text-color">Price (USD $)</label>
                    <div className="relative">
                      <DollarSign size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-light" />
                      <input 
                        type="number" 
                        placeholder="0.00" 
                        required
                        min="0"
                        step="0.01"
                        value={newPlan.price || ''}
                        onChange={e => setNewPlan(prev => ({ ...prev, price: Number(e.target.value) }))}
                        className="border border-border rounded-lg pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-3 focus:ring-primary/10 transition-all w-full"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-text-color">Billing Cycle</label>
                    <select 
                      value={newPlan.billingCycle}
                      onChange={e => setNewPlan(prev => ({ ...prev, billingCycle: e.target.value as any }))}
                      className="border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-3 focus:ring-primary/10 transition-all bg-white"
                    >
                      <option value="Monthly">Monthly</option>
                      <option value="Yearly">Yearly</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-semibold text-text-color">Features</label>
                  {newPlan.features.map((feature, idx) => (
                    <div key={idx} className="flex gap-2">
                      <input 
                        type="text" 
                        placeholder="Enter feature..." 
                        value={feature}
                        onChange={e => handleFeatureChange(idx, e.target.value)}
                        className="flex-1 border border-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-primary"
                      />
                      <button 
                        type="button"
                        onClick={() => handleRemoveFeature(idx)}
                        className="p-2 text-danger hover:bg-danger/10 rounded-lg"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                  <button 
                    type="button"
                    onClick={handleAddFeature}
                    className="text-primary text-xs font-bold flex items-center gap-1 hover:underline"
                  >
                    <Plus size={14} /> Add Feature
                  </button>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-success text-white py-3 rounded-lg font-bold hover:bg-success/90 transition-all shadow-md"
                >
                  Save New Plan
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {plans.map((plan, idx) => (
          <motion.div 
            key={plan.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white rounded-2xl shadow-sm border border-border overflow-hidden flex flex-col hover:shadow-xl transition-all hover:-translate-y-1 relative group"
          >
            <button 
              onClick={() => onDeletePlan(plan.id)}
              className="absolute top-4 right-4 p-2 text-text-light hover:text-danger opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Trash2 size={16} />
            </button>
            <div className="p-8 text-center border-b border-border space-y-4">
              <h3 className="text-xl font-bold text-text-color">{plan.name}</h3>
              <div className="flex items-end justify-center gap-1">
                <span className="text-4xl font-black text-primary">${plan.price}</span>
                <span className="text-sm text-text-light mb-1">/{plan.billingCycle === 'Monthly' ? 'mo' : 'yr'}</span>
              </div>
            </div>
            <div className="p-8 flex-1 space-y-4">
              <ul className="space-y-3">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-text-color">
                    <Check size={16} className="text-success mt-0.5 shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-8 pt-0">
              <button className="w-full py-3 border-2 border-primary text-primary font-bold rounded-xl hover:bg-primary hover:text-white transition-all">
                Select Plan
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
