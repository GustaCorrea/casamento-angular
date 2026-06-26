export interface Gift {
  id?: number;
  name: string;
  description: string;
  value: number;
  imageUrl?: string;
  type: string;

  collected: number;
  status: 'ATIVO' | 'COMPLETO' | 'INDISPONIVEL';
}
