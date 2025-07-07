import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgFor } from '@angular/common';
import { Categoria } from 'src/app/models/categoria.model';
import { Cuenta } from 'src/app/models/cuenta.model';

@Component({
  selector: 'app-nueva-transaccion',
  templateUrl: './nueva-transaccion.dialog.html',
  styleUrls: ['./nueva-transaccion.dialog.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatIconModule,
    NgFor
  ]
})
export class NuevaTransaccionDialog {
  form = new FormGroup({
    tipo: new FormControl('', Validators.required),
    monto: new FormControl(0, [Validators.required, Validators.min(0)]),
    categoriaId: new FormControl('', Validators.required),
    cuentaOrigenId: new FormControl('', Validators.required),
    cuentaDestinoId: new FormControl(''),
    fecha: new FormControl(new Date(), Validators.required),
    descripcion: new FormControl('')
  });

  constructor(
    public dialogRef: MatDialogRef<NuevaTransaccionDialog>,
    @Inject(MAT_DIALOG_DATA) public data: {
      categorias: Categoria[],
      cuentas: Cuenta[]
    }
  ) {}

  get categorias() {
    return this.data.categorias;
  }

  get cuentas() {
    return this.data.cuentas;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}