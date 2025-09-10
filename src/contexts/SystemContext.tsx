'use client';

import React, { useState, useContext, createContext, useEffect, ReactNode } from 'react';
import { 
  Cliente, 
  Evento, 
  Funcionario, 
  Material, 
  Transacao, 
  SystemContextType 
} from '@/types';
import {
  INITIAL_CLIENTES,
  INITIAL_EVENTOS,
  INITIAL_FUNCIONARIOS,
  INITIAL_MATERIAIS,
  INITIAL_TRANSACOES
} from '@/constants';

// Create context with default empty values
const SystemContext = createContext<SystemContextType>({
  clientes: [],
  setClientes: () => {},
  eventos: [],
  setEventos: () => {},
  funcionarios: [],
  setFuncionarios: () => {},
  materiais: [],
  setMateriais: () => {},
  transacoes: [],
  setTransacoes: () => {}
});

// Provider component
export const SystemProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
  const [materiais, setMateriais] = useState<Material[]>([]);
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);

  // Initialize with sample data on component mount
  useEffect(() => {
    setClientes(INITIAL_CLIENTES);
    setEventos(INITIAL_EVENTOS);
    setFuncionarios(INITIAL_FUNCIONARIOS);
    setMateriais(INITIAL_MATERIAIS);
    setTransacoes(INITIAL_TRANSACOES);
  }, []);

  const contextValue: SystemContextType = {
    clientes,
    setClientes,
    eventos,
    setEventos,
    funcionarios,
    setFuncionarios,
    materiais,
    setMateriais,
    transacoes,
    setTransacoes
  };

  return (
    <SystemContext.Provider value={contextValue}>
      {children}
    </SystemContext.Provider>
  );
};

// Custom hook for using the context
export const useSystemContext = () => {
  const context = useContext(SystemContext);
  if (!context) {
    throw new Error('useSystemContext must be used within a SystemProvider');
  }
  return context;
};

export default SystemContext;