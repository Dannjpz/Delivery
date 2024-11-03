import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Cliente } from '../../../models/cliente';
import { ClienteService } from '../../../services/cliente.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-cliente-list',
  standalone: true,
  imports: [
    RouterModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.css']
})
export class ClienteListComponent implements OnInit {
  clientes: Cliente[] = [];
  displayedColumns: string[] = ['idCliente', 'nombre', 'acciones'];

  constructor(
    private readonly clienteService: ClienteService,
    private readonly authService: AuthService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return;
    }
    this.loadClientes();
  }

  loadClientes(): void {
    this.clienteService.getClientes()
      .subscribe({
        next: (data) => {
          this.clientes = data;
        },
        error: (error) => {
          console.error('Error al cargar clientes:', error);
          if (error.status === 403) {
            this.authService.logout();
            this.router.navigate(['/login']);
          }
        }
      });
  }

  deleteCliente(cliente: Cliente): void {
    if (confirm('¿Está seguro de eliminar este cliente?')) {
      this.clienteService.deleteCliente(cliente)
        .subscribe({
          next: () => {
            this.loadClientes(); // Recargar la lista
          },
          error: (error) => {
            console.error('Error al eliminar cliente:', error);
          }
        });
    }
  }
}