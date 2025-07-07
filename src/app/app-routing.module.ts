import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RecordatoriosComponent } from './components/recordatorios/recordatorios.component';
import { CategoriasComponent } from './components/categorias/categorias.component';
import { PresupuestoComponent } from './components/presupuesto/presupuesto.component';
import { CuentasComponent } from './components/cuentas/cuentas.component';
import { EtiquetasComponent } from './components/etiquetas/etiquetas.component';
import { PapeleraComponent } from './components/papelera/papelera.component';
import { AjustesComponent } from './components/ajustes/ajustes.component';
import { TransaccionesComponent } from './components/transacciones/transacciones.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'recordatorios', component: RecordatoriosComponent },
  { path: 'categorias', component: CategoriasComponent },
  { path: 'presupuesto', component: PresupuestoComponent },
  { path: 'cuentas', component: CuentasComponent },
  { path: 'etiquetas', component: EtiquetasComponent },
  { path: 'papelera', component: PapeleraComponent },
  { path: 'ajustes', component: AjustesComponent },
  { path: 'transacciones', component: TransaccionesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
