import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Producto } from "../models/producto";
import { CartItem, CartUtils } from "../models/cartItem";

@Injectable({
    providedIn: 'root'
})
export class CartService {
    private readonly items = new BehaviorSubject<CartItem[]>([]);
    private cartItems: CartItem[] = [];
    private readonly total = new BehaviorSubject<number>(0);

    constructor() {
        // Recuperar carrito del localStorage si existe
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            this.cartItems = JSON.parse(savedCart);
            this.items.next(this.cartItems);
            this.updateTotal();
        }
    }

    getItems(): Observable<CartItem[]> {
        return this.items.asObservable();
    }

    getTotal(): Observable<number> {
        return this.total.asObservable();
    }

    addToCart(producto: Producto, cantidad: number): void {
        const existingItem = this.cartItems.find(item =>
            item.producto.idProducto === producto.idProducto
        );

        if (existingItem) {
            existingItem.cantidad += cantidad;
        } else {
            this.cartItems.push({ producto, cantidad });
        }

        this.updateCart();
    }

    removeItem(productoId: number): void {
        this.cartItems = this.cartItems.filter(item =>
            item.producto.idProducto !== productoId
        );
        this.updateCart();
    }

    updateItemQuantity(productoId: number, cantidad: number): void {
        const item = this.cartItems.find(item =>
            item.producto.idProducto === productoId
        );

        if (item) {
            item.cantidad = cantidad;
            if (item.cantidad <= 0) {
                this.removeItem(productoId);
            } else {
                this.updateCart();
            }
        }
    }

    getItemCount(): number {
        return this.cartItems.reduce((count, item) => count + item.cantidad, 0);
    }

    getSubtotal(item: CartItem): number {
        return CartUtils.calculateSubtotal(item);
    }

    clearCart(): void {
        this.cartItems = [];
        this.updateCart();
    }

    private updateCart(): void {
        localStorage.setItem('cart', JSON.stringify(this.cartItems));
        this.items.next([...this.cartItems]);
        this.updateTotal();
    }

    private updateTotal(): void {
        this.total.next(CartUtils.calculateTotal(this.cartItems));
    }
}