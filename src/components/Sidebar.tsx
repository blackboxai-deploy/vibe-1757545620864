'use client';

import React from 'react';
import { Button } from "@/components/ui/button";
import { Users, Calendar, DollarSign, Package, UserCheck, Home } from "lucide-react";

interface SidebarProps {
  activeModule: string;
  setActiveModule: (module: string) => void;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeModule, setActiveModule, onLogout }) => {
  const modules = [
    { id: 'dashboard', name: 'Dashboard', icon: Home },
    { id: 'clientes', name: 'Clientes', icon: Users },
    { id: 'eventos', name: 'Eventos', icon: Calendar },
    { id: 'equipe', name: 'Equipe', icon: UserCheck },
    { id: 'materiais', name: 'Materiais', icon: Package },
    { id: 'financeiro', name: 'Financeiro', icon: DollarSign },
  ];

  return (
    <div className="w-64 bg-white shadow-lg">
      <div className="p-6 border-b">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center">
            <Users className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              Festa Kids Pro
            </h1>
            <p className="text-xs text-gray-500">Gestão Completa</p>
          </div>
        </div>
      </div>
      
      <nav className="mt-6">
        {modules.map((module) => {
          const Icon = module.icon;
          return (
            <button
              key={module.id}
              onClick={() => setActiveModule(module.id)}
              className={`w-full flex items-center px-6 py-3 text-left hover:bg-gray-100 transition-colors ${
                activeModule === module.id 
                  ? 'bg-gradient-to-r from-pink-50 to-purple-50 border-r-4 border-pink-500 text-pink-700' 
                  : 'text-gray-700'
              }`}
            >
              <Icon className="w-5 h-5 mr-3" />
              {module.name}
            </button>
          );
        })}
      </nav>

      <div className="absolute bottom-4 left-4 right-4">
        <Button
          variant="outline"
          onClick={onLogout}
          className="w-full"
        >
          Sair
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;