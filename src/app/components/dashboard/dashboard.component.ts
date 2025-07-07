import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { DatabaseService } from '../../services/database.service';
import { DashboardCard } from '../../models/dashboard-card-data.model';
import { MatDialog } from '@angular/material/dialog';
import { DecimalPipe } from '@angular/common';
import { EditCardDialogComponent } from './edit-card-dialog/edit-card-dialog.component';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDropList, CdkDrag } from '@angular/cdk/drag-drop';

import { DashboardCardData } from '../../models/dashboard-card-data.model';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MatCard, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardContent, MatCardActions } from '@angular/material/card';
import { MatTabGroup, MatTab } from '@angular/material/tabs';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
    standalone: true,
    imports: [
      CommonModule,
      MatTabGroup,
      MatTab,
      CdkDropList,
      NgFor,
      CdkDrag,
      MatCard,
      MatCardHeader,
      MatCardTitle,
      MatCardSubtitle,
      MatCardContent,
      NgIf,
      MatCardActions,
      MatIconButton,
      MatIcon,
      DecimalPipe
    ]
})
export class DashboardComponent implements OnInit {
  tabs: string[] = ['Tablero', 'Configuración'];
  selectedTab = 0;
  cards: DashboardCard[] = [];
  currentCard: DashboardCard | null = null;
  isEditing = false;

  constructor(
    private databaseService: DatabaseService,
    private dialog: MatDialog,
    public decimalPipe: DecimalPipe
  ) {
    this.loadCards();
  }

  ngOnInit(): void {
    this.loadCards();
  }

  loadCards(): void {
    this.databaseService.getDashboardCards().subscribe(cards => {
      this.cards = cards;
    });
  }

  saveCards(): void {
    //this.databaseService.saveDashboardCards(this.cards).subscribe();
  }

  getCardLabel(card: DashboardCard, key: string): string {
    if (!card.datos) return '';
    const value = card.datos[key];
    return (value !== undefined && value !== null) ? String(value) : '';
  }

  getCardItems(card: DashboardCard): Array<{ label: string; value: number }> {
    if (!card.datos || !card.datos.items || !Array.isArray(card.datos.items)) return [];
    return card.datos.items;
  }

  onTabChange(index: number): void {
    this.selectedTab = index;
  }

  handleDrop(event: CdkDragDrop<DashboardCard[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    this.cards.forEach((card, index) => {
      card.orden = index;
    });
    this.saveCards();
  }

  editarCard(card: DashboardCard): void {
    const dialogRef = this.dialog.open(EditCardDialogComponent, {
      width: '500px',
      data: { card }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const index = this.cards.findIndex(c => c.id === result.id);
        if (index > -1) {
          this.cards[index] = result;
          this.saveCards();
        }
      }
    });
  }

  eliminarCard(card: DashboardCard): void {
    this.databaseService.deleteCard(card.id).subscribe(() => {
      this.cards = this.cards.filter(c => c.id !== card.id);
      this.saveCards();
    });
  }

  private parseCardData(data: DashboardCardData): DashboardCardData {
    const result: DashboardCardData = {
      ...data,
      items: data.items?.map(item => ({
        label: item.label || '',
        value: typeof item.value === 'number' ? item.value : 0
      })) || []
    };
    return result;
  }
}