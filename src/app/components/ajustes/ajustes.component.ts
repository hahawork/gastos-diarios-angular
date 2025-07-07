import { Component } from '@angular/core';
import { MatSelectChange, MatSelect } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent } from '@angular/material/card';
import { MatSlideToggle } from '@angular/material/slide-toggle';

@Component({
    selector: 'app-ajustes',
    template: `
    <div class="ajustes-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Apariencia</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <mat-form-field appearance="outline">
            <mat-label>Tema</mat-label>
            <mat-select [(value)]="temaActual" (selectionChange)="cambiarTema($event)">
              <mat-option value="light">Claro</mat-option>
              <mat-option value="dark">Oscuro</mat-option>
            </mat-select>
          </mat-form-field>

          <div class="tema-selector">
            <div class="tema-option" (click)="seleccionarTema('verde')" (keydown.enter)="seleccionarTema('verde')" tabindex="0">
              <div class="tema-preview verde"></div>
              <span>Verde</span>
            </div>
            <div class="tema-option" (click)="seleccionarTema('celeste')" (keydown.enter)="seleccionarTema('celeste')" tabindex="0">
              <div class="tema-preview celeste"></div>
              <span>Celeste</span>
            </div>
          </div>
        </mat-card-content>
      </mat-card>

      <mat-card>
        <mat-card-header>
          <mat-card-title>Moneda</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <mat-form-field appearance="outline">
            <mat-label>Moneda Base</mat-label>
            <mat-select [(value)]="monedaBase">
              <mat-option value="USD">Dólar (USD)</mat-option>
              <mat-option value="EUR">Euro (EUR)</mat-option>
              <mat-option value="ARS">Peso Argentino (ARS)</mat-option>
              <mat-option value="COP">Peso Colombiano (COP)</mat-option>
            </mat-select>
          </mat-form-field>
        </mat-card-content>
      </mat-card>

      <mat-card>
        <mat-card-header>
          <mat-card-title>Otros</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <mat-slide-toggle [(ngModel)]="notificaciones">
            Notificaciones
          </mat-slide-toggle>
          
          <mat-slide-toggle [(ngModel)]="alertas">
            Alertas sonoras
          </mat-slide-toggle>
        </mat-card-content>
      </mat-card>
    </div>
  `,
    styles: [`
    .ajustes-container {
      padding: 20px;
      max-width: 800px;
      margin: 0 auto;
    }

    .tema-selector {
      display: flex;
      gap: 20px;
      margin-top: 20px;
    }

    .tema-option {
      display: flex;
      flex-direction: column;
      align-items: center;
      cursor: pointer;
      padding: 10px;
      border-radius: 8px;
      transition: transform 0.2s;
    }

    .tema-option:hover {
      transform: scale(1.05);
    }

    .tema-preview {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin-bottom: 8px;
    }

    .verde {
      background-color: var(--primary-color);
    }

    .celeste {
      background-color: var(--accent-color);
    }

    mat-card {
      margin-bottom: 20px;
    }
  `],
    standalone: true,
    imports: [MatCard, MatCardHeader, MatCardTitle, MatCardContent, MatFormField, MatLabel, MatSelect, MatOption, MatSlideToggle, FormsModule]
})
export class AjustesComponent {
  temaActual = 'light';
  monedaBase = 'USD';
  notificaciones = true;
  alertas = true;

  cambiarTema(event: MatSelectChange): void {
    console.log(event.value);
  }

  seleccionarTema(color: string): void {
    console.log(color);
  }
}
