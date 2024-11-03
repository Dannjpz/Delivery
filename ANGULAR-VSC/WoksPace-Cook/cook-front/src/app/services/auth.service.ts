import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AuthResponse, LoginRequest } from '../models/auth';
import { StorageService } from './storage.service';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly baseUrl = 'http://localhost:8081/api/auth';

    constructor(
        private readonly http: HttpClient,
        private readonly storageService: StorageService,
        private readonly router: Router
    ) {
        // Verificar el token cuando el servicio se inicia
        this.checkTokenExpiration();
    }

    private checkTokenExpiration(): void {
        const token = this.getToken();
        if (token) {
            try {
                const tokenData = JSON.parse(atob(token.split('.')[1]));
                const expirationDate = new Date(tokenData.exp * 1000);

                if (expirationDate <= new Date()) {
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
                    }
                })
            );
    }

    isAuthenticated(): boolean {
        const token = this.storageService.getItem('token');
        if (!token) return false;

        try {
            const tokenData = JSON.parse(atob(token.split('.')[1]));
            const expirationDate = new Date(tokenData.exp * 1000);

            if (expirationDate <= new Date()) {
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

    logout(): void {
        this.storageService.removeItem('token');
        this.router.navigate(['/login']);
    }
}