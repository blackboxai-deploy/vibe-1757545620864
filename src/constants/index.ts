// Constants and default data for Festa Kids Pro System

import { Cliente, Evento, Funcionario, Material, Transacao } from '@/types';

export const SERVICOS_DISPONIVEIS = [
  'recreacao', 
  'animacao', 
  'brinquedos', 
  'personagens', 
  'camarim', 
  'pintura', 
  'oficinas'
];

export const ESPECIALIDADES_DISPONIVEIS = [
  'recreacao', 
  'animacao', 
  'pintura', 
  'personagens', 
  'camarim', 
  'oficinas', 
  'brinquedos'
];

export const CATEGORIAS_MATERIAIS = [
  'Brinquedos Infláveis', 
  'Pintura Artística', 
  'Recreação', 
  'Animação', 
  'Personagens', 
  'Camarim Fashion', 
  'Oficinas', 
  'Outros'
];

export const CATEGORIAS_TRANSACOES = [
  'Evento', 
  'Materiais', 
  'Salários', 
  'Marketing', 
  'Outros'
];

export const FORMAS_PAGAMENTO = [
  'Dinheiro', 
  'Cartão', 
  'PIX', 
  'Transferência', 
  'Cheque'
];

export const STATUS_EVENTOS = [
  'planejado', 
  'andamento', 
  'concluido', 
  'cancelado'
] as const;

// Initial sample data
export const INITIAL_CLIENTES: Cliente[] = [
  {
    id: '1',
    nome: 'Maria Silva',
    email: 'maria@email.com',
    telefone: '(11) 99999-9999',
    endereco: 'Rua das Flores, 123',
    dataUltimoEvento: '2024-01-15',
    totalEventos: 3
  },
  {
    id: '2',
    nome: 'João Santos',
    email: 'joao@email.com',
    telefone: '(11) 88888-8888',
    endereco: 'Av. Principal, 456',
    dataUltimoEvento: '2024-01-20',
    totalEventos: 1
  },
  {
    id: '3',
    nome: 'Ana Costa',
    email: 'ana.costa@email.com',
    telefone: '(11) 77777-7777',
    endereco: 'Rua dos Sonhos, 789',
    dataUltimoEvento: '2024-02-01',
    totalEventos: 2
  }
];

export const INITIAL_EVENTOS: Evento[] = [
  {
    id: '1',
    clienteId: '1',
    nomeCliente: 'Maria Silva',
    data: '2024-02-15',
    horario: '14:00',
    endereco: 'Rua das Flores, 123',
    quantidadeCriancas: 20,
    servicos: ['recreacao', 'animacao', 'brinquedos'],
    status: 'planejado',
    equipeAlocada: ['1', '2'],
    materiaisAlocados: ['1', '2'],
    valor: 1500,
    observacoes: 'Tema: Princesas'
  },
  {
    id: '2',
    clienteId: '2',
    nomeCliente: 'João Santos',
    data: '2024-02-20',
    horario: '15:30',
    endereco: 'Av. Principal, 456',
    quantidadeCriancas: 15,
    servicos: ['animacao', 'personagens'],
    status: 'planejado',
    equipeAlocada: ['2'],
    materiaisAlocados: ['3'],
    valor: 1200,
    observacoes: 'Super-heróis'
  }
];

export const INITIAL_FUNCIONARIOS: Funcionario[] = [
  {
    id: '1',
    nome: 'Ana Recreadora',
    cargo: 'Recreadora',
    telefone: '(11) 77777-7777',
    email: 'ana@empresa.com',
    especialidades: ['recreacao', 'pintura'],
    salario: 2500,
    disponivel: true
  },
  {
    id: '2',
    nome: 'Carlos Animador',
    cargo: 'Animador',
    telefone: '(11) 66666-6666',
    email: 'carlos@empresa.com',
    especialidades: ['animacao', 'personagens'],
    salario: 3000,
    disponivel: true
  },
  {
    id: '3',
    nome: 'Beatriz Artista',
    cargo: 'Pintora Facial',
    telefone: '(11) 55555-5555',
    email: 'beatriz@empresa.com',
    especialidades: ['pintura', 'camarim'],
    salario: 2200,
    disponivel: false
  }
];

export const INITIAL_MATERIAIS: Material[] = [
  {
    id: '1',
    nome: 'Piscina de Bolinhas',
    categoria: 'Brinquedos Infláveis',
    quantidade: 5,
    quantidadeEmUso: 2,
    valorUnitario: 200,
    observacoes: 'Verificar estado antes do uso'
  },
  {
    id: '2',
    nome: 'Kit Pintura Facial',
    categoria: 'Pintura Artística',
    quantidade: 10,
    quantidadeEmUso: 3,
    valorUnitario: 50
  },
  {
    id: '3',
    nome: 'Fantasia Super-Herói',
    categoria: 'Personagens',
    quantidade: 8,
    quantidadeEmUso: 1,
    valorUnitario: 150,
    observacoes: 'Lavar após cada uso'
  }
];

export const INITIAL_TRANSACOES: Transacao[] = [
  {
    id: '1',
    tipo: 'receita',
    descricao: 'Festa Maria Silva',
    valor: 1500,
    data: '2024-01-15',
    categoria: 'Evento',
    eventoId: '1',
    formaPagamento: 'Cartão'
  },
  {
    id: '2',
    tipo: 'despesa',
    descricao: 'Compra materiais',
    valor: 300,
    data: '2024-01-10',
    categoria: 'Materiais',
    formaPagamento: 'Dinheiro'
  },
  {
    id: '3',
    tipo: 'receita',
    descricao: 'Festa João Santos',
    valor: 1200,
    data: '2024-01-20',
    categoria: 'Evento',
    eventoId: '2',
    formaPagamento: 'PIX'
  },
  {
    id: '4',
    tipo: 'despesa',
    descricao: 'Salário Ana',
    valor: 2500,
    data: '2024-01-31',
    categoria: 'Salários',
    formaPagamento: 'Transferência'
  }
];