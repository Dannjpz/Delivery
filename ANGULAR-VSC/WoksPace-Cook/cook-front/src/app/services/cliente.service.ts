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
    return this.http.get<Cliente[]>(`${this.apiUrl}/listar`);
  }

  buscarCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(`${this.apiUrl}/buscar`, cliente);
  }

  createCliente(cliente: Cliente): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/guardar`, cliente);
  }

  updateCliente(cliente: Cliente): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/editar`, cliente);
  }

  deleteCliente(cliente: Cliente): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/eliminar`, cliente);
  }
}
