import { Component, OnInit } from '@angular/core';
import { Categoria } from '../../models/index';
import { MatDialog } from '@angular/material/dialog';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { CommonModule } from '@angular/common';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DatabaseService } from '../../services/database.service';

interface TreeNode extends Categoria {
  nivel: number;
  hijos: TreeNode[];
}

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatTreeModule,
    MatIconModule,
    MatButtonModule
  ]
})
    
export class CategoriasComponent implements OnInit {
  categorias: TreeNode[] = [];
  treeControl: FlatTreeControl<TreeNode>;
  dataSource: MatTreeFlatDataSource<TreeNode, TreeNode>;
  tipoFiltro = '';

  constructor(private dialog: MatDialog, private dbService: DatabaseService) {
    this.treeControl = new FlatTreeControl<TreeNode>(
      node => node.nivel,
      node => node.hijos.length > 0
    );

    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  }

  ngOnInit(): void {
    this.dbService.getCategorias().subscribe(categorias => {
      // Convertir categorías en TreeNode
      const treeNodes: TreeNode[] = categorias.map(categoria => ({
        ...categoria,
        nivel: categoria.padreId ? 1 : 0,
        hijos: []
      }));
      
      // Construir estructura de árbol
      const rootNodes: TreeNode[] = [];
      const nodeMap = new Map<number, TreeNode>();
      
      // Primero mapear todos los nodos
      treeNodes.forEach(node => {
        nodeMap.set(node.id, node);
      });
      
      // Luego asignar hijos y construir el árbol
      treeNodes.forEach(node => {
        if (node.padreId) {
          const parent = nodeMap.get(node.padreId);
          if (parent) {
            parent.hijos.push(node);
          }
        } else {
          rootNodes.push(node);
        }
      });
      
      this.categorias = rootNodes;
      this.dataSource.data = rootNodes;
    });
  }

  hasChild = (_: number, node: TreeNode): boolean => node.hijos.length > 0;

  isLeaf = (_: number, node: TreeNode): boolean => node.hijos.length === 0;

  toggle(node: TreeNode): void {
    this.treeControl.toggle(node);
  }

  nuevaCategoria(): void {
    // Implementar la lógica para abrir el diálogo de nueva categoría
  }

  editarCategoria(node: TreeNode): void {
    // Implementar la lógica para editar categoría
  }

  eliminarCategoria(node: TreeNode): void {
    // Implementar la lógica para eliminar categoría
  }

  private treeFlattener = new MatTreeFlattener(
    (node: TreeNode): TreeNode => node,
    (node: TreeNode): number => node.nivel,
    (node: TreeNode): boolean => node.hijos.length > 0,
    (node: TreeNode): TreeNode[] => node.hijos
  );
}
