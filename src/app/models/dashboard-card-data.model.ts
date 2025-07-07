export interface DashboardCardData {
  [key: string]: number | string | Array<{ label: string; value: number }> | undefined;
  valor?: number;
  unidad?: string;
  items?: Array<{ label: string; value: number }>;
  descripcion?: string;
}

export interface DashboardCard {
  id: string;
  titulo: string;
  tipo: 'estadistica' | 'grafico' | 'resumen';
  orden: number;
  datos?: DashboardCardData;
  configuracion?: {
    color?: string;
    icono?: string;
    periodo?: string;
  };
}
