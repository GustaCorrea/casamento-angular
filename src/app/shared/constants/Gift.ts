export interface Gift {
  id?: number;
  name: string;
  description: string;
  totalValue: number;
  imageUrl?: string;
  category: string;

  collected: number;
  status: 'ATIVO' | 'COMPLETO' | 'INDISPONIVEL';
}
