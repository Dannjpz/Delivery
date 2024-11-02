import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { Cliente } from '../../../models/cliente';
import { ClienteService } from '../../../services/cliente.service';

@Component({
  selector: 'app-cliente-create',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterModule
  ],
  templateUrl: './cliente-create.component.html',
  styleUrls: ['./cliente-create.component.css']
})
export class ClienteCreateComponent {

  cliente: Cliente = {
    nombre: ''
  };

  constructor(
    private readonly clienteService: ClienteService,
    private readonly router: Router
  ) { }

  onSubmit(): void {
    this.clienteService.createCliente(this.cliente)
      .subscribe({
        next: () => {
          this.router.navigate(['/clientes']);  // O puedes usar navigateByUrl
        },
        error: (error) => {
          console.error('Error al crear cliente:', error);
        }
      });
  }




}
