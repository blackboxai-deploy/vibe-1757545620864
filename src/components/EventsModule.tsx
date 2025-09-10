'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Plus, Edit, Trash } from "lucide-react";
import { useSystemContext } from '@/contexts/SystemContext';
import { Cliente, Evento } from '@/types';
import { SERVICOS_DISPONIVEIS, STATUS_EVENTOS } from '@/constants';

const EventsModule: React.FC = () => {
  const { eventos, setEventos, clientes } = useSystemContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('todos');
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Evento | null>(null);
  const [formData, setFormData] = useState({
    clienteId: '',
    data: '',
    horario: '',
    endereco: '',
    quantidadeCriancas: 0,
    servicos: [] as string[],
    valor: 0,
    observacoes: ''
  });

  const filteredEventos = eventos.filter((evento: Evento) => {
    const matchesSearch = evento.nomeCliente.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'todos' || evento.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleSave = () => {
    const cliente = clientes.find((c: Cliente) => c.id === formData.clienteId);
    if (!cliente || !formData.data || !formData.horario) return;

    if (editingEvent) {
      setEventos(eventos.map((e: Evento) => 
        e.id === editingEvent.id ? { 
          ...editingEvent, 
          ...formData, 
          nomeCliente: cliente.nome,
        } : e
      ));
    } else {
      const newEvent: Evento = {
        id: Date.now().toString(),
        ...formData,
        nomeCliente: cliente.nome,
        status: 'planejado',
        equipeAlocada: [],
        materiaisAlocados: []
      };
      setEventos([...eventos, newEvent]);
    }
    
    resetForm();
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingEvent(null);
    setFormData({
      clienteId: '',
      data: '',
      horario: '',
      endereco: '',
      quantidadeCriancas: 0,
      servicos: [],
      valor: 0,
      observacoes: ''
    });
  };

  const handleEdit = (evento: Evento) => {
    setEditingEvent(evento);
    setFormData({
      clienteId: evento.clienteId,
      data: evento.data,
      horario: evento.horario,
      endereco: evento.endereco,
      quantidadeCriancas: evento.quantidadeCriancas,
      servicos: evento.servicos,
      valor: evento.valor,
      observacoes: evento.observacoes || ''
    });
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    setEventos(eventos.filter((e: Evento) => e.id !== id));
  };

  const updateStatus = (id: string, status: 'planejado' | 'andamento' | 'concluido' | 'cancelado') => {
    setEventos(eventos.map((e: Evento) => 
      e.id === id ? { ...e, status } : e
    ));
  };

  const handleServicoChange = (servico: string, checked: boolean) => {
    if (checked) {
      setFormData({...formData, servicos: [...formData.servicos, servico]});
    } else {
      setFormData({...formData, servicos: formData.servicos.filter(s => s !== servico)});
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Eventos</h1>
          <p className="text-gray-600">Gerencie seus eventos e festas</p>
        </div>
        <Button 
          onClick={() => setShowForm(true)}
          className="bg-purple-500 hover:bg-purple-600"
        >
          <Plus className="w-4 h-4 mr-2" />
          Novo Evento
        </Button>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Buscar eventos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos</SelectItem>
            <SelectItem value="planejado">Planejado</SelectItem>
            <SelectItem value="andamento">Em Andamento</SelectItem>
            <SelectItem value="concluido">Concluído</SelectItem>
            <SelectItem value="cancelado">Cancelado</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {showForm && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>{editingEvent ? 'Editar Evento' : 'Novo Evento'}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="clienteId">Cliente *</Label>
                <Select value={formData.clienteId} onValueChange={(value) => setFormData({...formData, clienteId: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um cliente" />
                  </SelectTrigger>
                  <SelectContent>
                    {clientes.map((cliente: Cliente) => (
                      <SelectItem key={cliente.id} value={cliente.id}>{cliente.nome}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="data">Data *</Label>
                <Input
                  id="data"
                  type="date"
                  value={formData.data}
                  onChange={(e) => setFormData({...formData, data: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="horario">Horário *</Label>
                <Input
                  id="horario"
                  type="time"
                  value={formData.horario}
                  onChange={(e) => setFormData({...formData, horario: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="quantidadeCriancas">Quantidade de Crianças</Label>
                <Input
                  id="quantidadeCriancas"
                  type="number"
                  value={formData.quantidadeCriancas}
                  onChange={(e) => setFormData({...formData, quantidadeCriancas: parseInt(e.target.value) || 0})}
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="endereco">Endereço</Label>
                <Input
                  id="endereco"
                  value={formData.endereco}
                  onChange={(e) => setFormData({...formData, endereco: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="valor">Valor (R$)</Label>
                <Input
                  id="valor"
                  type="number"
                  step="0.01"
                  value={formData.valor}
                  onChange={(e) => setFormData({...formData, valor: parseFloat(e.target.value) || 0})}
                />
              </div>
              <div>
                <Label>Serviços</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {SERVICOS_DISPONIVEIS.map((servico) => (
                    <label key={servico} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.servicos.includes(servico)}
                        onChange={(e) => handleServicoChange(servico, e.target.checked)}
                        className="rounded"
                      />
                      <span className="capitalize text-sm">{servico}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="observacoes">Observações</Label>
                <Textarea
                  id="observacoes"
                  value={formData.observacoes}
                  onChange={(e) => setFormData({...formData, observacoes: e.target.value})}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex gap-2">
            <Button onClick={handleSave} className="bg-green-500 hover:bg-green-600">
              Salvar
            </Button>
            <Button variant="outline" onClick={resetForm}>
              Cancelar
            </Button>
          </CardFooter>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEventos.map((evento: Evento) => (
          <Card key={evento.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{evento.nomeCliente}</CardTitle>
                  <CardDescription>{evento.data} às {evento.horario}</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(evento)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(evento.id)}
                    className="text-red-600 hover:bg-red-50"
                  >
                    <Trash className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm"><strong>Endereço:</strong> {evento.endereco || 'Não informado'}</p>
              <p className="text-sm"><strong>Crianças:</strong> {evento.quantidadeCriancas}</p>
              <p className="text-sm"><strong>Valor:</strong> R$ {evento.valor.toLocaleString()}</p>
              <p className="text-sm"><strong>Serviços:</strong> {evento.servicos.length > 0 ? evento.servicos.join(', ') : 'Nenhum'}</p>
              {evento.observacoes && (
                <p className="text-sm"><strong>Observações:</strong> {evento.observacoes}</p>
              )}
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Status:</span>
                <Select
                  value={evento.status}
                  onValueChange={(value: 'planejado' | 'andamento' | 'concluido' | 'cancelado') => updateStatus(evento.id, value)}
                >
                  <SelectTrigger className="w-32 h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="planejado">Planejado</SelectItem>
                    <SelectItem value="andamento">Em Andamento</SelectItem>
                    <SelectItem value="concluido">Concluído</SelectItem>
                    <SelectItem value="cancelado">Cancelado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredEventos.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">
            {searchTerm || statusFilter !== 'todos' ? 'Nenhum evento encontrado' : 'Nenhum evento cadastrado'}
          </p>
        </div>
      )}
    </div>
  );
};

export default EventsModule;