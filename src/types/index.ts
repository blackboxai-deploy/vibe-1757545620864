// TypeScript interfaces for Festa Kids Pro System

export interface Cliente {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  endereco: string;
  dataUltimoEvento?: string;
  totalEventos: number;
}

export interface Evento {
  id: string;
  clienteId: string;
  nomeCliente: string;
  data: string;
  horario: string;
  endereco: string;
  quantidadeCriancas: number;
  servicos: string[];
  status: 'planejado' | 'andamento' | 'concluido' | 'cancelado';
  equipeAlocada: string[];
  materiaisAlocados: string[];
  valor: number;
  observacoes?: string;
}

export interface Funcionario {
  id: string;
  nome: string;
  cargo: string;
  telefone: string;
  email: string;
  especialidades: string[];
  salario: number;
  disponivel: boolean;
}

export interface Material {
  id: string;
  nome: string;
  categoria: string;
  quantidade: number;
  quantidadeEmUso: number;
  valorUnitario: number;
  observacoes?: string;
}

export interface Transacao {
  id: string;
  tipo: 'receita' | 'despesa';
  descricao: string;
  valor: number;
  data: string;
  categoria: string;
  eventoId?: string;
  formaPagamento: string;
}

export interface SystemContextType {
  clientes: Cliente[];
  setClientes: (clientes: Cliente[]) => void;
  eventos: Evento[];
  setEventos: (eventos: Evento[]) => void;
  funcionarios: Funcionario[];
  setFuncionarios: (funcionarios: Funcionario[]) => void;
  materiais: Material[];
  setMateriais: (materiais: Material[]) => void;
  transacoes: Transacao[];
  setTransacoes: (transacoes: Transacao[]) => void;
}