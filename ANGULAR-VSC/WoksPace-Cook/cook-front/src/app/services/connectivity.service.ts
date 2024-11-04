
import { BehaviorSubject, fromEvent, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, NgZone, PLATFORM_ID } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ConnectivityService {
    private readonly online = new BehaviorSubject<boolean>(true);
    private readonly isBrowser: boolean;

    constructor(
        private readonly ngZone: NgZone,
        private readonly snackBar: MatSnackBar
    ) {
        this.isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
        if (this.isBrowser) {
            this.initializeConnectionMonitoring();
        }
    }

    private initializeConnectionMonitoring(): void {
        // Estado inicial
        this.online.next(navigator.onLine);

        // Monitorear cambios de conexión
        this.ngZone.runOutsideAngular(() => {
            merge(
                fromEvent(window, 'online').pipe(map(() => true)),
                fromEvent(window, 'offline').pipe(map(() => false))
            ).subscribe(isOnline => {
                this.ngZone.run(() => {
                    this.online.next(isOnline);
                    this.showConnectivityMessage(isOnline);
                });
            });
        });
    }

    private showConnectivityMessage(isOnline: boolean): void {
        const message = isOnline
            ? 'Conexión restaurada'
            : 'Sin conexión - Trabajando offline';

        this.snackBar.open(message, 'Cerrar', {
            duration: 3000,
            panelClass: isOnline ? ['success-snackbar'] : ['error-snackbar'],
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
        });
    }

    isOnline(): Observable<boolean> {
        return this.online.asObservable();
    }

    checkConnectivity(): boolean {
        return this.isBrowser ? navigator.onLine : true;
    }
}