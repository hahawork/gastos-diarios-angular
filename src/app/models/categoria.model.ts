export interface Categoria {
  id: number;
  nombre: string;
  tipo: 'ingreso' | 'egreso';
  icono: string;
  color: string;
  padreId?: number;
  activa: boolean;
}
