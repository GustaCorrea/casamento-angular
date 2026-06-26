export interface Guest {
  id?: number;
  nome: string;
  email?: string;
  telefone?: string;
  restricoes: string;
  limiteAcompanhantes: number;
  status: 'Confirmado' | 'Aguardando' | 'Recusado';
  acompanhantes?: { nome: string; email?: string; telefone?: string }[];
}
