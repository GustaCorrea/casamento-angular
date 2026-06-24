export interface GiftItem {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  imageAlt?: string;
  targetAmount: number;
  currentAmount: number;
  category: string;
}