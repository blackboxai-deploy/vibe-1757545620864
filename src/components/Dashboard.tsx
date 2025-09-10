'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Calendar, DollarSign } from "lucide-react";
import { useSystemContext } from '@/contexts/SystemContext';
import { Evento, Transacao, Funcionario } from '@/types';
import StatCard from './StatCard';

const Dashboard: React.FC = () => {
  const { clientes, eventos, transacoes, funcionarios } = useSystemContext();

  // Calculate statistics
  const totalClientes = clientes.length;
  const eventosPendentes = eventos.filter((e: Evento) => e.status === 'planejado').length;
  const receitaTotal = transacoes
    .filter((t: Transacao) => t.tipo === 'receita')
    .reduce((acc: number, t: Transacao) => acc + t.valor, 0);
  const despesaTotal = transacoes
    .filter((t: Transacao) => t.tipo === 'despesa')
    .reduce((acc: number, t: Transacao) => acc + t.valor, 0);
  const lucro = receitaTotal - despesaTotal;

  // Get upcoming events
  const proximosEventos = eventos
    .filter((e: Evento) => new Date(e.data) >= new Date())
    .sort((a: Evento, b: Evento) => new Date(a.data).getTime() - new Date(b.data).getTime())
    .slice(0, 5);

  // Get available team members
  const equipeDisponivel = funcionarios.filter((f: Funcionario) => f.disponivel);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Visão geral do seu negócio</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Clientes"
          value={totalClientes}
          icon={Users}
          gradient="from-blue-50 to-blue-100 border-blue-200"
          textColor="text-blue-600"
        />
        
        <StatCard
          title="Eventos Pendentes"
          value={eventosPendentes}
          icon={Calendar}
          gradient="from-green-50 to-green-100 border-green-200"
          textColor="text-green-600"
        />
        
        <StatCard
          title="Receita Total"
          value={receitaTotal}
          icon={DollarSign}
          gradient="from-yellow-50 to-yellow-100 border-yellow-200"
          textColor="text-yellow-600"
        />
        
        <StatCard
          title="Lucro"
          value={lucro}
          icon={DollarSign}
          gradient={lucro >= 0 ? "from-purple-50 to-purple-100 border-purple-200" : "from-red-50 to-red-100 border-red-200"}
          textColor={lucro >= 0 ? "text-purple-600" : "text-red-600"}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Próximos Eventos</CardTitle>
          </CardHeader>
          <CardContent>
            {proximosEventos.length > 0 ? (
              <div className="space-y-4">
                {proximosEventos.map((evento: Evento) => (
                  <div key={evento.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{evento.nomeCliente}</p>
                      <p className="text-sm text-gray-600">{evento.data} às {evento.horario}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      evento.status === 'planejado' ? 'bg-blue-100 text-blue-800' :
                      evento.status === 'andamento' ? 'bg-yellow-100 text-yellow-800' :
                      evento.status === 'concluido' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {evento.status}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">Nenhum evento próximo</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Equipe Disponível</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {equipeDisponivel.map((funcionario: Funcionario) => (
                <div key={funcionario.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{funcionario.nome}</p>
                    <p className="text-sm text-gray-600">{funcionario.cargo}</p>
                  </div>
                  <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                    Disponível
                  </span>
                </div>
              ))}
              {equipeDisponivel.length === 0 && (
                <p className="text-gray-500 text-center py-8">Nenhum funcionário disponível</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;