import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Producto } from "../models/producto";

@Injectable({
    providedIn: 'root'
})
export class ProductoService {
    private readonly baseUrl = 'http://localhost:8081/api/productos';

    constructor(private readonly http: HttpClient) { }

    listarProductos(): Observable<Producto[]> {
        return this.http.get<Producto[]>(`${this.baseUrl}/listarProducto`);
    }

    listarDisponibles(): Observable<Producto[]> {
        return this.http.get<Producto[]>(`${this.baseUrl}/productoDisponibles`);
    }

    listarPorCategoria(categoriaId: number): Observable<Producto[]> {
        return this.http.get<Producto[]>(`${this.baseUrl}/listarProductoCategoria/${categoriaId}`);
    }

    buscarProducto(id: number): Observable<Producto> {
        return this.http.get<Producto>(`${this.baseUrl}/buscarProducto/${id}`);
    }

    guardarProducto(producto: Producto): Observable<void> {
        return this.http.post<void>(`${this.baseUrl}/guardarProducto`, producto);
    }

    editarProducto(producto: Producto): Observable<void> {
        return this.http.put<void>(`${this.baseUrl}/editarProducto`, producto);
    }

    eliminarProducto(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/eliminarProducto/${id}`);
    }
}
