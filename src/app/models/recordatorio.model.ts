export interface Recordatorio {
  id: number;
  descripcion: string;
  tipo: 'ingreso' | 'egreso';
  monto: number;
  frecuencia: 'diaria' | 'semanal' | 'quincenal' | 'mensual' | 'anual';
  dia?: number;
  diaSemana?: number;
  proximaFecha: Date;
  pagado: boolean;
  cuentaId: number;
}