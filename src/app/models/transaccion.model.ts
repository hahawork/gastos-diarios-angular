export interface Transaccion {
  id?: number;
  tipo: 'ingreso' | 'egreso' | 'transferencia';
  monto: number;
  fecha: Date;
  descripcion: string;
  categoriaId: number;
  cuentaId: number;
  cuentaDestinoId?: number;
  etiquetas?: string[];
  activa?: boolean;
  recordatorio?: boolean;
  pagado?: boolean;
}
