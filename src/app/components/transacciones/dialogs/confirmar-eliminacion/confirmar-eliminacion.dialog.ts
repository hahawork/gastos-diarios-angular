import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmar-eliminacion',
  template: `
    <h2 mat-dialog-title>Confirmar Eliminación</h2>
    <div mat-dialog-content>
      <p>¿Estás seguro que deseas eliminar esta transacción?</p>
    </div>
    <div mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>No</button>
      <button mat-button [mat-dialog-close]="true" cdkFocusInitial>Eliminar</button>
    </div>
  `
})
export class ConfirmarEliminacionDialog {
  constructor(
    public dialogRef: MatDialogRef<ConfirmarEliminacionDialog>
  ) {}
}
