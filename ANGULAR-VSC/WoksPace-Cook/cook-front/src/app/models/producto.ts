export interface Categoria {
    idCategoria: number;
    nombre: string;
    descripcion: string;
}

export interface Producto {
    idProducto: number;
    nombre: string;
    descripcion: string;
    precio: number;
    imagen: string;
    disponible: boolean;
    categoria: Categoria;
}