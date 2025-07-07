import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, map, catchError, throwError, switchMap } from 'rxjs';
import { Cuenta, Categoria, Transaccion, Recordatorio, DashboardCard } from '../models/index';

interface DatabaseTables {
  cuentas: Cuenta;
  categorias: Categoria;
  transacciones: Transaccion;
  recordatorios: Recordatorio;
  dashboard: DashboardCard;
}

interface RawDashboardCard extends Omit<DashboardCard, 'datos' | 'configuracion'> {
  datos?: string;
  configuracion?: string;
}

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private apiUrl = 'http://localhost:7001/api';

  constructor(private http: HttpClient) {}

  // CRUD operations for cuentas
  getCuentas(): Observable<Cuenta[]> {
    return this.http.get<Cuenta[]>(`${this.apiUrl}/cuentas`).pipe(
      catchError((error) => {
        console.error('Error al obtener cuentas:', error);
        return of([
          {
            id: 1,
            nombre: 'Cuenta Principal',
            saldo: 10000,
            tipo: 'banco' as const,
            moneda: 'USD',
            activa: true
          }
        ]);
      })
    );
  }

  getCuentaById(id: number): Observable<Cuenta> {
    return this.http.get<Cuenta>(`${this.apiUrl}/cuentas/${id}`).pipe(
      catchError((error) => {
        console.error('Error al obtener cuenta:', error);
        return throwError(() => new Error('Cuenta no encontrada'));
      })
    );
  }

  addCuenta(cuenta: Cuenta): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/cuentas`, cuenta).pipe(
      catchError((error) => {
        console.error('Error al agregar cuenta:', error);
        return of(undefined);
      })
    );
  }

  updateCuenta(cuenta: Cuenta): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/cuentas/${cuenta.id}`, cuenta).pipe(
      catchError((error) => {
        console.error('Error al actualizar cuenta:', error);
        return of(undefined);
      })
    );
  }

  deleteCuenta(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/cuentas/${id}`).pipe(
      catchError((error) => {
        console.error('Error al eliminar cuenta:', error);
        return of(undefined);
      })
    );
  }

  // CRUD operations for transacciones
  deleteTransaccion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/transacciones/${id}`).pipe(
      catchError((error) => {
        console.error('Error al eliminar transacción:', error);
        return of(undefined);
      })
    );
  }

  // CRUD operations for categorias
  getCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${this.apiUrl}/categorias`).pipe(
      map((categorias) => categorias.map(categoria => ({
        ...categoria,
        tipo: categoria.tipo as 'ingreso' | 'egreso',
        icono: categoria.icono || 'default-icon',
        color: categoria.color || '#000000',
        activa: categoria.activa ?? true
      })) as Categoria[]),
      catchError((error) => {
        console.error('Error al obtener categorías:', error);
        return of([
          {
            id: 1,
            nombre: 'Sueldo',
            tipo: 'ingreso' as const,
            icono: 'default-icon',
            color: '#000000',
            activa: true
          },
          {
            id: 2,
            nombre: 'Alimentos',
            tipo: 'egreso' as const,
            icono: 'default-icon',
            color: '#000000',
            activa: true
          }
        ]);
      })
    );
  }

  agregarCategoria(categoria: Categoria): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/categorias`, categoria).pipe(
      catchError((error) => {
        console.error('Error al agregar categoría:', error);
        return of(undefined);
      })
    );
  }

  actualizarCategoria(categoria: Categoria): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/categorias/${categoria.id}`, categoria).pipe(
      catchError((error) => {
        console.error('Error al actualizar categoría:', error);
        return of(undefined);
      })
    );
  }

  eliminarCategoria(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/categorias/${id}`).pipe(
      catchError((error) => {
        console.error('Error al eliminar categoría:', error);
        return of(undefined);
      })
    );
  }

  addTransaccion(transaccion: Transaccion): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/transacciones`, {
      ...transaccion,
      fecha: transaccion.fecha.toISOString(),
      activa: transaccion.activa
    }).pipe(
      catchError((error) => {
        console.error('Error al agregar transacción:', error);
        return of(undefined);
      })
    );
  }

  updateTransaccion(transaccion: Transaccion): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/transacciones/${transaccion.id}`, {
      ...transaccion,
      fecha: transaccion.fecha.toISOString(),
      activa: transaccion.activa
    }).pipe(
      catchError((error) => {
        console.error('Error al actualizar transacción:', error);
        return of(undefined);
      })
    );
  }

  getTransacciones(): Observable<Transaccion[]> {
    return this.http.get<Transaccion[]>(`${this.apiUrl}/transacciones`).pipe(
      map(transacciones => transacciones.map(transaccion => ({
        ...transaccion,
        fecha: new Date(transaccion.fecha)
      })) as Transaccion[]),
      catchError((error) => {
        console.error('Error al obtener transacciones:', error);
        // Datos dummy para cuando no hay transacciones
        return of([
          {
            id: 1,
            tipo: 'ingreso',
            monto: 1000,
            fecha: new Date(),
            descripcion: 'Salario mensual',
            categoriaId: 1,
            cuentaId: 1,
            cuentaDestinoId: null,
            etiquetas: ['trabajo'],
            activa: true,
            recordatorio: false,
            pagado: true
          },
          {
            id: 2,
            tipo: 'egreso',
            monto: 500,
            fecha: new Date(),
            descripcion: 'Alquiler',
            categoriaId: 2,
            cuentaId: 1,
            cuentaDestinoId: null,
            etiquetas: ['vivienda'],
            activa: true,
            recordatorio: true,
            pagado: false
          },
          {
            id: 3,
            tipo: 'transferencia',
            monto: 200,
            fecha: new Date(),
            descripcion: 'Transferencia a ahorros',
            categoriaId: 3,
            cuentaId: 1,
            cuentaDestinoId: 2,
            etiquetas: ['ahorro'],
            activa: true,
            recordatorio: false,
            pagado: true
          }
        ] as Transaccion[]);
      })
    );
  }

  getRecordatorios(): Observable<Recordatorio[]> {
    return this.http.get<Recordatorio[]>(`${this.apiUrl}/recordatorios`).pipe(
      catchError((error) => {
        console.error('Error al obtener recordatorios:', error);
        return of([]);
      })
    );
  }

  getRecordatorioById(id: number): Observable<Recordatorio> {
    return this.http.get<Recordatorio>(`${this.apiUrl}/recordatorios/${id}`).pipe(
      catchError((error) => {
        console.error('Error al obtener recordatorio:', error);
        return throwError(() => new Error('Recordatorio no encontrado'));
      })
    );
  }

  agregarRecordatorio(recordatorio: Recordatorio): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/recordatorios`, {
      ...recordatorio,
      proximaFecha: recordatorio.proximaFecha.toISOString(),
      pagado: recordatorio.pagado
    }).pipe(
      catchError((error) => {
        console.error('Error al agregar recordatorio:', error);
        return of(undefined);
      })
    );
  }

  actualizarRecordatorio(recordatorio: Recordatorio): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/recordatorios/${recordatorio.id}`, {
      ...recordatorio,
      proximaFecha: recordatorio.proximaFecha.toISOString(),
      pagado: recordatorio.pagado
    }).pipe(
      catchError((error) => {
        console.error('Error al actualizar recordatorio:', error);
        return of(undefined);
      })
    );
  }

  eliminarRecordatorio(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/recordatorios/${id}`).pipe(
      catchError((error) => {
        console.error('Error al eliminar recordatorio:', error);
        return of(undefined);
      })
    );
  }

  marcarRecordatorioComoPagado(id: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/recordatorios/${id}/pagado`, null).pipe(
      catchError((error) => {
        console.error('Error al marcar recordatorio como pagado:', error);
        return of(undefined);
      })
    );
  }

  // CRUD operations for dashboard
  getDashboardCards(): Observable<DashboardCard[]> {
    return this.http.get<DashboardCard[]>(`${this.apiUrl}/dashboard`).pipe(
      map(data => data.map(item => ({
        ...item,
        datos: item.datos ? JSON.parse(item.datos as unknown as string) : undefined,
        configuracion: item.configuracion ? JSON.parse(item.configuracion as unknown as string) : undefined
      })) as DashboardCard[]),
      catchError((error) => {
        console.error('Error al obtener dashboard:', error);
        return of([]);
      })
    );
  }

  addDashboardCard(card: DashboardCard): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/dashboard`, {
      ...card,
      datos: card.datos ? JSON.stringify(card.datos) : null,
      configuracion: card.configuracion ? JSON.stringify(card.configuracion) : null
    }).pipe(
      catchError((error) => {
        console.error('Error al agregar dashboard card:', error);
        return of(undefined);
      })
    );
  }

  updateOrdenCards(cards: DashboardCard[]): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/dashboard/orden`, cards).pipe(
      catchError((error) => {
        console.error('Error al actualizar orden de cards:', error);
        return of(undefined);
      })
    );
  }

  deleteCard(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/dashboard/${id}`).pipe(
      catchError((error) => {
        console.error('Error al eliminar card:', error);
        return of(undefined);
      })
    );
  }

  updateCard(card: DashboardCard): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/dashboard/${card.id}`, {
      ...card,
      datos: card.datos ? JSON.stringify(card.datos) : null,
      configuracion: card.configuracion ? JSON.stringify(card.configuracion) : null
    }).pipe(
      catchError((error) => {
        console.error('Error al actualizar card:', error);
        return of(undefined);
      })
    );
  }
}
