import { Producto } from "./producto";

export interface CartItem {
    producto: Producto;
    cantidad: number;
}

// También podríamos agregar algunos métodos de utilidad si lo necesitas
export const CartUtils = {
    calculateSubtotal(item: CartItem): number {
        return item.producto.precio * item.cantidad;
    },

    calculateTotal(items: CartItem[]): number {
        return items.reduce((total, item) => total + (item.producto.precio * item.cantidad), 0);
    }
};

