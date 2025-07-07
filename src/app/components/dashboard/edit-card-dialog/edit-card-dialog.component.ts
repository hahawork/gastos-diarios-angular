import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogTitle, MatDialogContent, MatDialogActions } from '@angular/material/dialog';
import { DashboardCard } from 'src/app/models';
import { DashboardCardData } from 'src/app/models/dashboard-card-data.model';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton, MatButton } from '@angular/material/button';
import { NgIf, NgFor } from '@angular/common';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';

@Component({
    selector: 'app-edit-card-dialog',
    templateUrl: './edit-card-dialog.component.html',
    styleUrls: ['./edit-card-dialog.component.scss'],
    standalone: true,
    imports: [MatDialogTitle, MatDialogContent, FormsModule, ReactiveFormsModule, MatFormField, MatLabel, MatInput, NgIf, MatError, NgFor, MatIconButton, MatIcon, MatButton, MatDialogActions]
})

export class EditCardDialogComponent implements OnInit {
  form: FormGroup;
  items: Array<{ label: string; value: number }> = [];

  constructor(
    public dialogRef: MatDialogRef<EditCardDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { card: DashboardCard }
  ) {
    this.form = new FormGroup({
      titulo: new FormControl('', Validators.required),
      valor: new FormControl(0, [Validators.required, Validators.min(0)])
    });

    if (data.card) {
      this.form.patchValue({
        titulo: data.card.titulo,
        valor: data.card.datos?.valor || 0
      });
      this.items = data.card.datos?.items || [];
    }
  }

  save(): void {
    if (this.form.valid) {
      const cardData: DashboardCardData = {
        valor: this.form.value.valor,
        items: this.items
      };
      const updatedCard: DashboardCard = {
        ...this.data.card,
        titulo: this.form.value.titulo,
        datos: cardData
      };
      this.dialogRef.close({ card: updatedCard });
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {}

  addItem(): void {
    this.items.push({ label: '', value: 0 });
  }

  removeItem(index: number): void {
    this.items.splice(index, 1);
  }
}
