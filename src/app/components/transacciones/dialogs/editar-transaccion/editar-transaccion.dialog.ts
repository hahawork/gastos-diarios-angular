import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Inject } from '@angular/core';
import { Transaccion } from 'src/app/models/transaccion.model';
import { Categoria, Cuenta } from 'src/app/models';

@Component({
  selector: 'app-editar-transaccion',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule
  ],
  templateUrl: './editar-transaccion.dialog.html',
  styleUrls: ['./editar-transaccion.dialog.css']
})
export class EditarTransaccionDialog {
  form = new FormGroup({
    tipo: new FormControl('', Validators.required),
    monto: new FormControl(0, [Validators.required, Validators.min(0)]),
    categoriaId: new FormControl(0, Validators.required),
    cuentaId: new FormControl(0, Validators.required),
    cuentaDestinoId: new FormControl(0),
    fecha: new FormControl(new Date(), Validators.required),
    descripcion: new FormControl('')
  });

  constructor(
    public dialogRef: MatDialogRef<EditarTransaccionDialog>,
    @Inject(MAT_DIALOG_DATA) public data: {
      transaccion: Transaccion,
      categorias: Categoria[],
      cuentas: Cuenta[]
    }
  ) {
    this.form.patchValue({
      tipo: this.data.transaccion.tipo,
      monto: this.data.transaccion.monto,
      categoriaId: this.data.transaccion.categoriaId,
      cuentaId: this.data.transaccion.cuentaId,
      cuentaDestinoId: this.data.transaccion.cuentaDestinoId || 0,
      fecha: this.data.transaccion.fecha,
      descripcion: this.data.transaccion.descripcion
    });
  }

  get categorias() {
    return this.data.categorias;
  }

  get cuentas() {
    return this.data.cuentas;
  }
}
