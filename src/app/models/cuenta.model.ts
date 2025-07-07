export interface Cuenta {
  id?: number;
  nombre: string;
  tipo: 'banco' | 'efectivo';
  saldo: number;
  moneda: string;
  color?: string;
  activa: boolean;
}
