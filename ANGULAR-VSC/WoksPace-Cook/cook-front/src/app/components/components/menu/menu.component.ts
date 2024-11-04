import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatBadgeModule } from '@angular/material/badge';
import { CartService } from '../../../services/cart.service';
import { Categoria, Producto } from '../../../models/producto';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductoService } from '../../../services/producto.service';
import { CategoriaService } from '../../../services/categoria.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule,
    MatProgressBarModule,
    RouterLink
  ],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent implements OnInit {
  categorias: Categoria[] = [];
  productos: Producto[] = [];
  selectedCategory: number | null = null;
  quantities: Map<number, number> = new Map();
  cartItemCount = 0;
  loading = false;
  error = '';

  constructor(
    private readonly productoService: ProductoService,
    private readonly categoriaService: CategoriaService,
    private readonly cartService: CartService,
    private readonly snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadCategorias();
    this.loadProducts();
  }

  loadCategorias(): void {
    this.categoriaService.listarCategorias().subscribe({
      next: (categorias) => {
        this.categorias = categorias;
      },
      error: (err) => {
        this.snackBar.open('Error al cargar las categorías', 'Cerrar', {
          duration: 3000
        });
      }
    });
  }

  selectCategory(categoriaId: number): void {
    this.selectedCategory = categoriaId;
    this.loading = true;
    this.error = '';

    this.productoService.listarPorCategoria(categoriaId).subscribe({
      next: (productos) => {
        this.productos = productos;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar los productos de la categoría';
        this.loading = false;
        this.snackBar.open('Error al filtrar los productos', 'Cerrar', {
          duration: 3000
        });
      }
    });
  }

  loadProducts(): void {
    this.loading = true;
    this.error = '';

    this.productoService.listarProductos().subscribe({
      next: (productos) => {
        this.productos = productos;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar los productos';
        this.loading = false;
        this.snackBar.open('Error al cargar los productos', 'Cerrar', {
          duration: 3000
        });
      }
    });
  }

  incrementQuantity(producto: Producto): void {
    const current = this.quantities.get(producto.idProducto) ?? 0;
    this.quantities.set(producto.idProducto, current + 1);
  }

  decrementQuantity(producto: Producto): void {
    const current = this.quantities.get(producto.idProducto) ?? 0;
    if (current > 0) {
      this.quantities.set(producto.idProducto, current - 1);
    }
  }

  getQuantity(producto: Producto): number {
    return this.quantities.get(producto.idProducto) ?? 0;
  }

  addToCart(producto: Producto): void {
    const quantity = this.quantities.get(producto.idProducto) ?? 0;
    if (quantity > 0) {
      this.cartService.addToCart(producto, quantity);
      this.quantities.set(producto.idProducto, 0);
      this.updateCartCount();
      this.snackBar.open('Producto agregado al carrito', 'Cerrar', {
        duration: 2000
      });
    }
  }

  private updateCartCount(): void {
    this.cartService.getItems().subscribe(items => {
      this.cartItemCount = items.reduce((total, item) => total + item.cantidad, 0);
    });
  }

}