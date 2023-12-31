export interface PurchaseTransaction {
  cartId: number;
  totalToPay: number;
  paymentMethod: string;
  paymentType: string;
  address?: string | null;
  phone?: string | null;
  userId: number;
}
