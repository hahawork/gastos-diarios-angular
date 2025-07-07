import { Component, OnInit, ViewChild, TemplateRef, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatabaseService } from '../../services/database.service';
import { Recordatorio } from '../../models/index';
import { MatDialog, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { MatDatepickerInput, MatDatepickerToggle, MatDatepicker } from '@angular/material/datepicker';
import { MatOption } from '@angular/material/core';
import { MatSelect, MatSelectChange } from '@angular/material/select';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { NgFor, NgIf, TitleCasePipe, CurrencyPipe, DatePipe } from '@angular/common';
import { MatCard, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardContent } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatIconButton } from '@angular/material/button';

@Component({
    selector: 'app-recordatorios',
    template: `
    <div class="recordatorios-container">
      <div class="toolbar">
        <button mat-raised-button color="primary" (click)="abrirDialogo()">
          <mat-icon>add</mat-icon>
          Nuevo Recordatorio
        </button>
      </div>

      <mat-card class="recordatorios-grid">
        <mat-card *ngFor="let recordatorio of recordatorios">
          <mat-card-header>
            <mat-card-title>{{recordatorio.descripcion}}</mat-card-title>
            <mat-card-subtitle>
              {{recordatorio.proximaFecha | date:'dd/MM/yyyy'}} •
              {{recordatorio.frecuencia | titlecase}}
            </mat-card-subtitle>
          </mat-card-header>

          <mat-card-content>
            <div class="recordatorio-info">
              <div class="monto">
                <span class="label">Monto:</span>
                <span class="value" [class.ingreso]="recordatorio.tipo === 'ingreso'" [class.egreso]="recordatorio.tipo === 'egreso'">
                  {{recordatorio.monto | currency:monedaBase}}
                </span>
              </div>
              
              <div class="frecuencia">
                <span class="label">Frecuencia:</span>
                <span class="value">
                  {{recordatorio.frecuencia | titlecase}}
                  <ng-container *ngIf="recordatorio.dia">
                    (Día {{recordatorio.dia}})
                  </ng-container>
                  <ng-container *ngIf="recordatorio.diaSemana">
                    ({{recordatorio.diaSemana | date:'EEEE'}})
                  </ng-container>
                </span>
              </div>
            </div>

            <div class="acciones">
              <button mat-icon-button (click)="marcarComoPagado(recordatorio)">
                <mat-icon>{{recordatorio.pagado ? 'check_circle' : 'radio_button_unchecked'}}</mat-icon>
              </button>
              <button mat-icon-button (click)="editarRecordatorio(recordatorio)">
                <mat-icon>edit</mat-icon>
              </button>
              <button mat-icon-button (click)="eliminarRecordatorio(recordatorio)">
                <mat-icon>delete</mat-icon>
              </button>
            </div>
          </mat-card-content>
        </mat-card>
      </mat-card>
    </div>

    <!-- Diálogo para nuevo/editar recordatorio -->
    <ng-template #dialogoRecordatorio>
      <div class="dialogo-container">
        <h2 mat-dialog-title>{{modo === 'nuevo' ? 'Nuevo Recordatorio' : 'Editar Recordatorio'}}</h2>
        <mat-dialog-content>
          <form [formGroup]="formRecordatorio">
            <mat-form-field appearance="outline">
              <mat-label>Descripción</mat-label>
              <input matInput formControlName="descripcion">
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Tipo</mat-label>
              <mat-select formControlName="tipo">
                <mat-option value="ingreso">Ingreso</mat-option>
                <mat-option value="egreso">Egreso</mat-option>
              </mat-select>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Monto</mat-label>
              <input matInput formControlName="monto" type="number">
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Frecuencia</mat-label>
              <mat-select formControlName="frecuencia" (selectionChange)="cambiarFrecuencia($event)">
                <mat-option value="diaria">Diaria</mat-option>
                <mat-option value="semanal">Semanal</mat-option>
                <mat-option value="mensual">Mensual</mat-option>
                <mat-option value="anual">Anual</mat-option>
              </mat-select>
            </mat-form-field>

            <div *ngIf="frecuencia === 'mensual'">
              <mat-form-field appearance="outline">
                <mat-label>Día del mes</mat-label>
                <input matInput formControlName="dia" type="number" min="1" max="31">
              </mat-form-field>
            </div>

            <div *ngIf="frecuencia === 'semanal'">
              <mat-form-field appearance="outline">
                <mat-label>Día de la semana</mat-label>
                <mat-select formControlName="diaSemana">
                  <mat-option value="1">Lunes</mat-option>
                  <mat-option value="2">Martes</mat-option>
                  <mat-option value="3">Miércoles</mat-option>
                  <mat-option value="4">Jueves</mat-option>
                  <mat-option value="5">Viernes</mat-option>
                  <mat-option value="6">Sábado</mat-option>
                  <mat-option value="7">Domingo</mat-option>
                </mat-select>
              </mat-form-field>
            </div>

            <mat-form-field appearance="outline">
              <mat-label>Próxima fecha</mat-label>
              <input matInput [matDatepicker]="picker" formControlName="proximaFecha">
              <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
              <mat-datepicker #picker></mat-datepicker>
            </mat-form-field>
          </form>
        </mat-dialog-content>
        <mat-dialog-actions>
          <button mat-button mat-dialog-close>Cancelar</button>
          <button mat-raised-button color="primary" (click)="guardarRecordatorio()">Guardar</button>
        </mat-dialog-actions>
      </div>
    </ng-template>
  `,
    styles: [`
    .recordatorios-container {
      padding: 20px;
    }

    .toolbar {
      margin-bottom: 20px;
    }

    .recordatorios-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 20px;
    }

    .recordatorio-info {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .monto, .frecuencia {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .label {
      font-weight: 500;
      color: #666;
    }

    .value {
      font-weight: bold;
    }

    .value.ingreso {
      color: var(--primary-color);
    }

    .value.egreso {
      color: var(--warn-color);
    }

    .acciones {
      display: flex;
      gap: 8px;
      margin-top: 10px;
    }

    .dialogo-container {
      width: 100%;
      max-width: 500px;
    }
  `],
    standalone: true,
    imports: [MatButton, MatIcon, MatCard, NgFor, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardContent, NgIf, MatIconButton, MatDialogTitle, MatDialogContent, FormsModule, ReactiveFormsModule, MatFormField, MatLabel, MatInput, MatSelect, MatOption, MatDatepickerInput, MatDatepickerToggle, MatSuffix, MatDatepicker, MatDialogActions, MatDialogClose, TitleCasePipe, CurrencyPipe, DatePipe]
})
export class RecordatoriosComponent implements OnInit {
  recordatorios: Recordatorio[] = [];
  monedaBase = 'USD';
  modo: 'nuevo' | 'editar' = 'nuevo';
  frecuencia: 'diaria' | 'semanal' | 'mensual' | 'anual' = 'mensual';
  formRecordatorio: FormGroup;

  private dbService = inject(DatabaseService);
  public dialog = inject(MatDialog);
  private fb = inject(FormBuilder);

  constructor() {
    this.formRecordatorio = this.fb.group({
      descripcion: [''],
      tipo: ['ingreso'],
      monto: [0],
      frecuencia: ['mensual'],
      dia: [null],
      diaSemana: [null],
      proximaFecha: [new Date()],
      pagado: [false],
      cuentaId: [null]
    });
  }

  ngOnInit(): void {
    this.cargarRecordatorios();
  }

  cargarRecordatorios(): void {
    this.dbService.getRecordatorios().subscribe(recordatorios => {
      this.recordatorios = recordatorios.map(recordatorio => ({
        id: recordatorio.id,
        descripcion: recordatorio.descripcion,
        tipo: recordatorio.tipo,
        monto: recordatorio.monto,
        frecuencia: recordatorio.frecuencia,
        dia: recordatorio.dia,
        diaSemana: recordatorio.diaSemana,
        proximaFecha: recordatorio.proximaFecha,
        pagado: recordatorio.pagado,
        cuentaId: recordatorio.cuentaId
      }));
    });
  }

  @ViewChild('dialogoRecordatorio') dialogoTemplate!: TemplateRef<Recordatorio>;

  abrirDialogo(recordatorio?: Recordatorio): void {
    const dialogRef = this.dialog.open(this.dialogoTemplate);

    if (recordatorio) {
      this.modo = 'editar';
      this.formRecordatorio.patchValue(recordatorio);
    } else {
      this.modo = 'nuevo';
      this.formRecordatorio.reset();
    }

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.guardarRecordatorio();
      }
    });
  }

  cambiarFrecuencia(event: MatSelectChange): void {
    this.frecuencia = event.value;
  }

  marcarComoPagado(recordatorio: Recordatorio): void {
    this.dbService.marcarRecordatorioComoPagado(recordatorio.id!).subscribe(() => {
      this.cargarRecordatorios();
    });
  }

  editarRecordatorio(recordatorio: Recordatorio): void {
    this.abrirDialogo(recordatorio);
  }

  eliminarRecordatorio(recordatorio: Recordatorio): void {
    this.dbService.eliminarRecordatorio(recordatorio.id!).subscribe(() => {
      this.cargarRecordatorios();
    });
  }

  guardarRecordatorio(): void {
    if (this.formRecordatorio.valid) {
      const recordatorio = this.formRecordatorio.value;
      
      if (this.modo === 'nuevo') {
        this.dbService.agregarRecordatorio(recordatorio).subscribe(() => {
          this.cargarRecordatorios();
        });
      } else {
        this.dbService.actualizarRecordatorio(recordatorio).subscribe(() => {
          this.cargarRecordatorios();
        });
      }
    }
  }
}
