export type Listing = {
  id: string;
  seller_id: string;
  title: string;
  category: string;
  status: string;
  asking_price: number;
  created_at?: string;
  description?: string;
  monthly_revenue?: number;
  monthly_profit?: number;
  business_model?: string;
};
