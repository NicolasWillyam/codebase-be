export interface CreatePaymentDto {
  amount: number;
  currency: string;
  description: string;
  metadata?: Record<string, any>;
}

export interface PaymentResponse {
  id: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed';
  createdAt: Date;
}

export interface PaymentService {
  createPayment(dto: CreatePaymentDto): Promise<PaymentResponse>;
  verifyPayment(paymentId: string): Promise<PaymentResponse>;
  cancelPayment(paymentId: string): Promise<void>;
} 