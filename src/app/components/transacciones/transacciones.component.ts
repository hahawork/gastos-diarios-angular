import { Component, OnInit, inject, ViewChild } from '@angular/core';
import { CommonModule, NgFor, NgClass, CurrencyPipe, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { DatabaseService } from '../../services/database.service';
import { Transaccion, Cuenta, Categoria } from '../../models/index';
import { forkJoin } from 'rxjs';
import { EditarTransaccionDialog } from './dialogs/editar-transaccion/editar-transaccion.dialog';
import { ConfirmarEliminacionDialog } from './dialogs/confirmar-eliminacion/confirmar-eliminacion.dialog';
import { NuevaTransaccionDialog } from './dialogs/nueva-transaccion/nueva-transaccion.dialog';

@Component({
  selector: 'app-transacciones',
  templateUrl: './transacciones.component.html',
  styleUrls: ['./transacciones.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatFormFieldModule,
    MatOptionModule,
    NgFor,
    NgClass,
    CurrencyPipe,
    DatePipe
  ]
})
export class TransaccionesComponent implements OnInit {
  displayedColumns: string[] = ['fecha', 'tipo', 'monto', 'categoria', 'cuenta', 'cuentaDestino', 'descripcion', 'acciones'];
  selectedCategoria: string | null = null;
  selectedCuenta: string | null = null;
  startDate: Date | null = null;
  endDate: Date | null = null;
  transacciones: Transaccion[] = [];
  cuentas: Cuenta[] = [];
  categorias: Categoria[] = [];
  dataSource = new MatTableDataSource(this.transacciones);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private dbService: DatabaseService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  private cargarDatos(): void {
    // Cargar transacciones
    this.dbService.getTransacciones().subscribe({
      next: (transacciones: Transaccion[]) => {
        this.transacciones = transacciones.map(transaccion => ({
          ...transaccion,
          cuenta: this.cuentas.find(c => c.id === transaccion.cuentaId),
          cuentaDestino: transaccion.cuentaDestinoId ? this.cuentas.find(c => c.id === transaccion.cuentaDestinoId) : null
        }));
        this.dataSource.data = this.transacciones;
      },
      error: (error: Error) => console.error('Error al cargar transacciones:', error)
    });

    // Cargar cuentas y categorías
    forkJoin([
      this.dbService.getCuentas(),
      this.dbService.getCategorias()
    ]).subscribe({
      next: ([cuentas, categorias]: [Cuenta[], Categoria[]]) => {
        this.cuentas = cuentas;
        this.categorias = categorias;
        // Actualizar la tabla con las cuentas
        this.cargarDatos();
      },
      error: (error: Error) => console.error('Error al cargar cuentas y categorías:', error)
    });
  }

  editarTransaccion(transaccion: Transaccion): void {
    const dialogRef = this.dialog.open(EditarTransaccionDialog, {
      width: '500px',
      data: { transaccion }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const transaccionActualizada = result as Transaccion;
        this.dbService.updateTransaccion(transaccionActualizada).subscribe({
          next: () => {
            this.cargarDatos();
          },
          error: (error: Error) => console.error('Error al actualizar transacción:', error)
        });
      }
    });
  }

  eliminarTransaccion(id: number): void {
    const dialogRef = this.dialog.open(ConfirmarEliminacionDialog, {
      width: '400px',
      data: { id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dbService.deleteTransaccion(id).subscribe({
          next: () => {
            this.cargarDatos();
          },
          error: (error: Error) => console.error('Error al eliminar transacción:', error)
        });
      }
    });
  }

  nuevaTransaccion(): void {
    const dialogRef = this.dialog.open(NuevaTransaccionDialog, {
      width: '500px',
      data: { cuentas: this.cuentas, categorias: this.categorias }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const nuevaTransaccion = result as Transaccion;
        this.dbService.addTransaccion(nuevaTransaccion).subscribe({
          next: () => {
            this.cargarDatos();
          },
          error: (error: Error) => console.error('Error al agregar transacción:', error)
        });
      }
    });
  }

  getNombreCategoria(id: number): string {
    const categoria = this.categorias.find(c => c.id === id);
    return categoria ? categoria.nombre : 'Sin categoría';
  }

  getNombreCuenta(id: number): string {
    const cuenta = this.cuentas.find(c => c.id === id);
    return cuenta ? cuenta.nombre : 'Sin cuenta';
  }
}
