export interface Gift {
  id?: number; // Ajustado para number puro para resolver os erros do delete/editingId
  name: string;
  description: string;
  value: number;
  collected: number;
  status?: string;
  
  // Adicionado 'type' e 'category' para atender tanto o Admin quanto o Marketplace
  type?: string;
  category?: string;
  
  // Imagem aceitando ambas as propriedades
  imageUrl?: string;
  url?: string;
}