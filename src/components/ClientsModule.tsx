'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, Plus, Edit, Trash } from "lucide-react";
import { useSystemContext } from '@/contexts/SystemContext';
import { Cliente, Evento } from '@/types';

const ClientsModule: React.FC = () => {
  const { clientes, setClientes, eventos } = useSystemContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingClient, setEditingClient] = useState<Cliente | null>(null);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    endereco: ''
  });

  const filteredClientes = clientes.filter((cliente: Cliente) =>
    cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSave = () => {
    if (!formData.nome || !formData.email) return;

    if (editingClient) {
      setClientes(clientes.map((c: Cliente) => 
        c.id === editingClient.id ? { ...editingClient, ...formData } : c
      ));
    } else {
      const newClient: Cliente = {
        id: Date.now().toString(),
        ...formData,
        totalEventos: 0
      };
      setClientes([...clientes, newClient]);
    }
    setShowForm(false);
    setEditingClient(null);
    setFormData({ nome: '', email: '', telefone: '', endereco: '' });
  };

  const handleEdit = (cliente: Cliente) => {
    setEditingClient(cliente);
    setFormData({
      nome: cliente.nome,
      email: cliente.email,
      telefone: cliente.telefone,
      endereco: cliente.endereco
    });
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    setClientes(clientes.filter((c: Cliente) => c.id !== id));
  };

  const getClienteEventos = (clienteId: string) => {
    return eventos.filter((e: Evento) => e.clienteId === clienteId);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Clientes</h1>
          <p className="text-gray-600">Gerencie seus clientes e histórico</p>
        </div>
        <Button 
          onClick={() => setShowForm(true)}
          className="bg-pink-500 hover:bg-pink-600"
        >
          <Plus className="w-4 h-4 mr-2" />
          Novo Cliente
        </Button>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Buscar clientes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {showForm && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>{editingClient ? 'Editar Cliente' : 'Novo Cliente'}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="nome">Nome *</Label>
                <Input
                  id="nome"
                  value={formData.nome}
                  onChange={(e) => setFormData({...formData, nome: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="telefone">Telefone</Label>
                <Input
                  id="telefone"
                  value={formData.telefone}
                  onChange={(e) => setFormData({...formData, telefone: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="endereco">Endereço</Label>
                <Input
                  id="endereco"
                  value={formData.endereco}
                  onChange={(e) => setFormData({...formData, endereco: e.target.value})}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex gap-2">
            <Button onClick={handleSave} className="bg-green-500 hover:bg-green-600">
              Salvar
            </Button>
            <Button 
              variant="outline" 
              onClick={() => {
                setShowForm(false);
                setEditingClient(null);
                setFormData({ nome: '', email: '', telefone: '', endereco: '' });
              }}
            >
              Cancelar
            </Button>
          </CardFooter>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClientes.map((cliente: Cliente) => (
          <Card key={cliente.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{cliente.nome}</CardTitle>
                  <CardDescription>{cliente.email}</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(cliente)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(cliente.id)}
                    className="text-red-600 hover:bg-red-50"
                  >
                    <Trash className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm"><strong>Telefone:</strong> {cliente.telefone || 'Não informado'}</p>
              <p className="text-sm"><strong>Endereço:</strong> {cliente.endereco || 'Não informado'}</p>
              <p className="text-sm"><strong>Total de Eventos:</strong> {getClienteEventos(cliente.id).length}</p>
              {cliente.dataUltimoEvento && (
                <p className="text-sm"><strong>Último Evento:</strong> {cliente.dataUltimoEvento}</p>
              )}
            </CardContent>
            <CardFooter>
              <div className="w-full">
                <h4 className="font-medium mb-2">Histórico de Eventos:</h4>
                {getClienteEventos(cliente.id).length > 0 ? (
                  <div className="space-y-2">
                    {getClienteEventos(cliente.id).slice(0, 3).map((evento: Evento) => (
                      <div key={evento.id} className="p-2 bg-gray-50 rounded text-sm">
                        <p><strong>{evento.data}</strong> - R$ {evento.valor.toLocaleString()}</p>
                        <p className="text-gray-600">{evento.observacoes}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">Nenhum evento realizado</p>
                )}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredClientes.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">Nenhum cliente encontrado</p>
        </div>
      )}
    </div>
  );
};

export default ClientsModule;