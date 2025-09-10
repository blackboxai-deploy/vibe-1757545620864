'use client';

import React, { useState } from 'react';
import LoginPage from '@/components/LoginPage';
import Sidebar from '@/components/Sidebar';
import Dashboard from '@/components/Dashboard';
import ClientsModule from '@/components/ClientsModule';
import EventsModule from '@/components/EventsModule';

const FestaKidsSystem: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeModule, setActiveModule] = useState('dashboard');

  const renderModule = () => {
    switch (activeModule) {
      case 'dashboard':
        return <Dashboard />;
      case 'clientes':
        return <ClientsModule />;
      case 'eventos':
        return <EventsModule />;
      case 'equipe':
        return <div className="p-8"><h1 className="text-2xl font-bold">Equipe - Em desenvolvimento</h1></div>;
      case 'materiais':
        return <div className="p-8"><h1 className="text-2xl font-bold">Materiais - Em desenvolvimento</h1></div>;
      case 'financeiro':
        return <div className="p-8"><h1 className="text-2xl font-bold">Financeiro - Em desenvolvimento</h1></div>;
      default:
        return <Dashboard />;
    }
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <Sidebar 
        activeModule={activeModule}
        setActiveModule={setActiveModule}
        onLogout={() => setIsLoggedIn(false)}
      />

      {/* Main Content */}
      <div className="flex-1 p-8">
        {renderModule()}
      </div>
    </div>
  );
};

export default FestaKidsSystem;