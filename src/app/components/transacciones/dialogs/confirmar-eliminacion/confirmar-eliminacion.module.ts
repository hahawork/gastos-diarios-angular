import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmarEliminacionDialog } from './confirmar-eliminacion.dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [ConfirmarEliminacionDialog],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],
  exports: [ConfirmarEliminacionDialog]
})
export class ConfirmarEliminacionModule {}
