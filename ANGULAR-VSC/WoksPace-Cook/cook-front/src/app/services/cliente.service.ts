import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private readonly apiUrl = 'http://localhost:8081/api/Cliente';

  constructor(private readonly http: HttpClient) { }

  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.apiUrl}/listarCliente`);
  }

  buscarCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(`${this.apiUrl}/buscarCliente`, cliente);
  }

  createCliente(cliente: Cliente): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/guardarCliente`, cliente);
  }

  updateCliente(cliente: Cliente): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/editarCliente`, cliente);
  }

  deleteCliente(cliente: Cliente): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/eliminarCliente`, cliente);
  }
}
