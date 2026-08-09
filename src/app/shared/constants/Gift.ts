export interface Gift {
  id?: number;
  name: string;
  description: string;
  value: number;
  collected: number;
  status?: 'ATIVO' | 'INATIVO'; 
  type?: string;
  imageUrl?: string;
  url?: string;
}