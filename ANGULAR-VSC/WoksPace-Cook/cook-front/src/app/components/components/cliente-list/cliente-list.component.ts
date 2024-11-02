import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Cliente } from '../../../models/cliente';
import { ClienteService } from '../../../services/cliente.service';

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

  constructor(private readonly clienteService: ClienteService) { }

  ngOnInit(): void {
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
        }
      });
  }

  deleteCliente(cliente: Cliente): void {
    if (confirm('¿Estás seguro de eliminar este cliente?')) {
      this.clienteService.deleteCliente(cliente)
        .subscribe({
          next: () => {
            this.loadClientes(); // Recargar la lista después de eliminar
          },
          error: (error) => {
            console.error('Error al eliminar cliente:', error);
          }
        });
    }
  }

}
