export interface DashboardCard {
  id: string;
  titulo: string;
  tipo: 'estadistica' | 'grafico' | 'resumen';
  orden: number;
  datos?: Record<string, unknown>;
  configuracion?: {
    color?: string;
    icono?: string;
    periodo?: string;
  };
}

export type DashboardCardData = Record<string, unknown>;
