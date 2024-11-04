import { inject, Injectable, OnDestroy, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { AuthResponse, LoginRequest } from '../models/auth';
import { StorageService } from './storage.service';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class AuthService implements OnDestroy {
    private readonly baseUrl = 'http://localhost:8081/api/auth';
    private sessionCheckInterval: any;
    private idleTimeout: any;
    private readonly isBrowser: boolean;
    private readonly IDLE_TIME = 5 * 60 * 1000; // 5 minutos de inactividad
    private readonly destroy$ = new Subject<void>();
    private redirectUrl: string = '/menu';

    constructor(
        private readonly http: HttpClient,
        private readonly storageService: StorageService,
        private readonly router: Router
    ) {
        this.isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
        if (this.isBrowser) {
            this.initSessionCheck();
            this.setupWindowEvents();
            this.setupIdleTimer();
        }
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
        this.destroySession();
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

    private setupIdleTimer(): void {
        if (!this.isBrowser) return;

        // Lista de eventos que reinician el temporizador de inactividad
        const events = [
            'mousedown', 'mousemove', 'keypress',
            'scroll', 'touchstart', 'click', 'keydown'
        ];

        // Función para reiniciar el temporizador
        const resetIdleTimer = () => {
            if (this.idleTimeout) {
                clearTimeout(this.idleTimeout);
            }
            // Si el usuario está autenticado, iniciar nuevo temporizador
            if (this.isAuthenticated()) {
                this.idleTimeout = setTimeout(() => {
                    console.log('Sesión cerrada por inactividad');
                    this.logout();
                }, this.IDLE_TIME);
            }
        };

        // Agregar listeners para todos los eventos
        events.forEach(event => {
            document.addEventListener(event, resetIdleTimer);
        });

        // Iniciar el temporizador
        resetIdleTimer();
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
                        this.setupIdleTimer();
                        // Usar la URL de redirección guardada
                        this.router.navigate([this.redirectUrl]);
                    }
                })
            );
    }

    setRedirectUrl(url: string): void {
        this.redirectUrl = url;
    }

    getRedirectUrl(): string {
        return this.redirectUrl;
    }


    logout(): void {
        if (this.idleTimeout) {
            clearTimeout(this.idleTimeout);
        }
        if (this.sessionCheckInterval) {
            clearInterval(this.sessionCheckInterval);
        }
        this.storageService.removeItem('token');
        this.storageService.removeItem('sessionStartTime');
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
        if (this.idleTimeout) {
            clearTimeout(this.idleTimeout);
        }
        this.storageService.removeItem('token');
        this.storageService.removeItem('sessionStartTime');
    }
}