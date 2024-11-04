import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categoria } from '../models/producto';

@Injectable({
    providedIn: 'root'
})
export class CategoriaService {
    private readonly baseUrl = 'http://localhost:8081/api/categorias';

    constructor(private readonly http: HttpClient) { }

    listarCategorias(): Observable<Categoria[]> {
        return this.http.get<Categoria[]>(`${this.baseUrl}/listarCategoria`);
    }

    buscarCategoria(id: number): Observable<Categoria> {
        return this.http.get<Categoria>(`${this.baseUrl}/buscarCategoria/${id}`);
    }

    guardarCategoria(categoria: Categoria): Observable<void> {
        return this.http.post<void>(`${this.baseUrl}/guardarCategoria`, categoria);
    }

    editarCategoria(categoria: Categoria): Observable<void> {
        return this.http.put<void>(`${this.baseUrl}/editarCategoria`, categoria);
    }

    eliminarCategoria(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/eliminarCategoria/${id}`);
    }
}