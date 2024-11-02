import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Cliente } from '../../../models/cliente';
import { ClienteService } from '../../../services/cliente.service';

@Component({
  selector: 'app-cliente-edit',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterModule
  ],
  templateUrl: './cliente-edit.component.html',
  styleUrls: ['./cliente-edit.component.css']
})

export class ClienteEditComponent {

  cliente: Cliente = {
    idCliente: 0,
    nombre: ''
  };

  constructor(
    private readonly clienteService: ClienteService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    const clienteId = this.route.snapshot.params['id'];
    const clienteParaBuscar = { idCliente: clienteId } as Cliente;
    this.clienteService.buscarCliente(clienteParaBuscar)
      .subscribe({
        next: (data) => {
          this.cliente = data;
        },
        error: (error) => {
          console.error('Error al cargar cliente:', error);
        }
      });
  }

  onSubmit(): void {
    this.clienteService.updateCliente(this.cliente)
      .subscribe({
        next: () => {
          this.router.navigate(['/clientes']);
        },
        error: (error) => {
          console.error('Error al actualizar cliente:', error);
        }
      });
  }

}
