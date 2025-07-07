import { Component, OnInit, inject } from '@angular/core';
import { DatabaseService } from '../../services/database.service';
import { Cuenta } from '../../models/index';
import { MatDialog, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgFor, CurrencyPipe } from '@angular/common';
import { MatCard, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardContent } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatIconButton } from '@angular/material/button';

@Component({
    selector: 'app-cuentas',
    template: `
    <div class="cuentas-container">
      <div class="toolbar">
        <button mat-raised-button color="primary" (click)="abrirDialogo()">
          <mat-icon>add</mat-icon>
          Nueva Cuenta
        </button>
      </div>

      <mat-card class="cuentas-grid">
        <mat-card *ngFor="let cuenta of cuentas" [class.inactiva]="!cuenta.activa">
          <mat-card-header>
            <mat-card-title>{{cuenta.nombre}}</mat-card-title>
            <mat-card-subtitle>{{cuenta.tipo}}</mat-card-subtitle>
          </mat-card-header>
          
          <mat-card-content>
            <div class="saldo">
              <span class="label">Saldo:</span>
              <span class="value" [class.negativo]="cuenta.saldo < 0">
                {{cuenta.saldo | currency:monedaBase}}
              </span>
            </div>
            
            <div class="acciones">
              <button mat-icon-button (click)="editarCuenta(cuenta)">
                <mat-icon>edit</mat-icon>
              </button>
              <button mat-icon-button (click)="cambiarEstado(cuenta)">
                <mat-icon>{{cuenta.activa ? 'visibility' : 'visibility_off'}}</mat-icon>
              </button>
              <button mat-icon-button (click)="eliminarCuenta(cuenta)">
                <mat-icon>delete</mat-icon>
              </button>
            </div>
          </mat-card-content>
        </mat-card>
      </mat-card>
    </div>

    <!-- Diálogo para nueva/editar cuenta -->
    <ng-template #dialogoCuenta>
      <div class="dialogo-container">
        <h2 mat-dialog-title>{{modo === 'nueva' ? 'Nueva Cuenta' : 'Editar Cuenta'}}</h2>
        <mat-dialog-content>
          <form [formGroup]="formCuenta">
            <mat-form-field appearance="outline">
              <mat-label>Nombre</mat-label>
              <input matInput formControlName="nombre">
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Tipo</mat-label>
              <mat-select formControlName="tipo">
                <mat-option value="banco">Cuenta Bancaria</mat-option>
                <mat-option value="efectivo">Efectivo</mat-option>
              </mat-select>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Saldo Inicial</mat-label>
              <input matInput formControlName="saldo" type="number">
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Moneda</mat-label>
              <mat-select formControlName="moneda">
                <mat-option value="USD">USD</mat-option>
                <mat-option value="EUR">EUR</mat-option>
                <mat-option value="ARS">ARS</mat-option>
                <mat-option value="COP">COP</mat-option>
              </mat-select>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Color</mat-label>
              <input matInput formControlName="color" type="color">
            </mat-form-field>
          </form>
        </mat-dialog-content>
        <mat-dialog-actions>
          <button mat-button mat-dialog-close>Cancelar</button>
          <button mat-raised-button color="primary" (click)="guardarCuenta()">Guardar</button>
        </mat-dialog-actions>
      </div>
    </ng-template>
  `,
    styles: [`
    .cuentas-container {
      padding: 20px;
    }

    .toolbar {
      margin-bottom: 20px;
    }

    .cuentas-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 20px;
    }

    mat-card {
      transition: transform 0.2s;
    }

    mat-card:hover {
      transform: translateY(-5px);
    }

    mat-card.inactiva {
      opacity: 0.7;
    }

    .saldo {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
    }

    .label {
      font-weight: 500;
      color: #666;
    }

    .value {
      font-size: 1.2em;
      font-weight: bold;
    }

    .value.negativo {
      color: var(--warn-color);
    }

    .acciones {
      display: flex;
      gap: 8px;
    }

    .dialogo-container {
      width: 100%;
      max-width: 500px;
    }
  `],
    standalone: true,
    imports: [MatButton, MatIcon, MatCard, NgFor, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardContent, MatIconButton, MatDialogTitle, MatDialogContent, FormsModule, ReactiveFormsModule, MatFormField, MatLabel, MatInput, MatSelect, MatOption, MatDialogActions, MatDialogClose, CurrencyPipe]
})
export class CuentasComponent implements OnInit {
  cuentas: Cuenta[] = [];
  monedaBase = 'USD';
  modo: 'nueva' | 'editar' = 'nueva';
  formCuenta!: FormGroup;

  private databaseService = inject(DatabaseService);
  public dialog = inject(MatDialog);

  ngOnInit(): void {
    this.cargarCuentas();
  }

  cargarCuentas(): void {
    this.databaseService.getCuentas().subscribe(cuentas => {
      this.cuentas = cuentas;
    });
  }

  abrirDialogo(): void {
    // Implementar diálogo para nueva/editar cuenta
  }

  editarCuenta(cuenta: Cuenta): void {
    console.log(cuenta);
  }

  cambiarEstado(cuenta: Cuenta): void {
    console.log(cuenta);
  }

  eliminarCuenta(cuenta: Cuenta): void {
    console.log(cuenta);
  }

  guardarCuenta(): void {
    // Implementar guardado de cuenta
  }
}
