import { Component, Input, ViewChild, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatIconButton } from '@angular/material/button';
import { MatToolbar } from '@angular/material/toolbar';
import { MatDivider } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';
import { RouterLink, RouterModule } from '@angular/router';
import { MatNavList, MatListItem } from '@angular/material/list';
import { MatDrawerContainer, MatDrawer, MatDrawerContent } from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.css'],
    standalone: true,
    imports: [CommonModule, RouterOutlet, MatToolbar, MatSidenavModule, MatButtonModule, MatIconModule, MatListModule, RouterLink, MatDivider, MatDrawerContainer, MatDrawer, MatDrawerContent, MatIconButton, MatMenuModule, MatMenuTrigger, RouterModule]
})
export class LayoutComponent {
  @Input() isDesktop = true;
  @ViewChild('drawer') drawer!: MatDrawer;
  private breakpointObserver = inject(BreakpointObserver);

  constructor() {
    this.breakpointObserver.observe([Breakpoints.Handset])
      .subscribe(result => {
        this.isDesktop = !result.matches;
      });
  }

  addTransaction(): void {
    // Implementar lógica para agregar transacción
  }

  addCategoria(): void {
    // Implementar lógica para agregar categoría
  }

  addCuenta(): void {
    // Implementar lógica para agregar cuenta
  }

  addPresupuesto(): void {
    // Implementar lógica para agregar presupuesto
  }

  addRecordatorio(): void {
    // Implementar lógica para agregar recordatorio
  }
}
