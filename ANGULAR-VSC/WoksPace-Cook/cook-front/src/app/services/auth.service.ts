import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AuthResponse, LoginRequest } from '../models/auth';
import { StorageService } from './storage.service';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly baseUrl = 'http://localhost:8081/api/auth';
    private sessionCheckInterval: any;
    private readonly isBrowser: boolean;

    constructor(
        private readonly http: HttpClient,
        private readonly storageService: StorageService,
        private readonly router: Router
    ) {
        this.isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
        if (this.isBrowser) {
            this.initSessionCheck();
            this.setupWindowEvents();
        }
    }

    private initSessionCheck(): void {
        if (!this.isBrowser) return;

        this.sessionCheckInterval = setInterval(() => {
            this.checkSessionValidity();
        }, 60000);
    }

    private setupWindowEvents(): void {
        if (!this.isBrowser) return;

        window.addEventListener('beforeunload', () => {
            // Opcional: cerrar sesión al cerrar la ventana
            this.logout();
        });

        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'visible') {
                this.checkSessionValidity();
            }
        });
    }

    private checkSessionValidity(): void {
        const token = this.getToken();
        if (token) {
            try {
                const tokenData = JSON.parse(atob(token.split('.')[1]));
                const expirationDate = new Date(tokenData.exp * 1000);

                // Si el token ha expirado o está próximo a expirar (ej: en 5 minutos)
                if (expirationDate.getTime() - Date.now() <= 300000) { // 5 minutos
                    this.logout();
                }
            } catch (e) {
                this.logout();
            }
        }
    }

    login(credentials: LoginRequest): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.baseUrl}/login`, credentials)
            .pipe(
                tap(response => {
                    if (response.exito && response.token) {
                        this.storageService.setItem('token', response.token);
                        this.storageService.setItem('sessionStartTime', Date.now().toString());
                        this.initSessionCheck();
                    }
                })
            );
    }

    logout(): void {
        this.storageService.removeItem('token');
        this.storageService.removeItem('sessionStartTime');
        if (this.sessionCheckInterval) {
            clearInterval(this.sessionCheckInterval);
        }
        this.router.navigate(['/login']);
    }

    isAuthenticated(): boolean {
        const token = this.getToken();
        if (!token) return false;

        try {
            const tokenData = JSON.parse(atob(token.split('.')[1]));
            const expirationDate = new Date(tokenData.exp * 1000);

            // Verificar también el tiempo máximo de sesión (ejemplo: 8 horas)
            const sessionStartTime = parseInt(this.storageService.getItem('sessionStartTime') ?? '0');
            const maxSessionTime = 8 * 60 * 60 * 1000; // 8 horas en milisegundos

            if (expirationDate <= new Date() || Date.now() - sessionStartTime >= maxSessionTime) {
                this.logout();
                return false;
            }
            return true;
        } catch (e) {
            this.logout();
            return false;
        }
    }

    getToken(): string | null {
        return this.storageService.getItem('token');
    }

    // Método para destruir la sesión cuando se cierra la aplicación
    destroySession(): void {
        if (this.sessionCheckInterval) {
            clearInterval(this.sessionCheckInterval);
        }
        this.logout();
    }
}