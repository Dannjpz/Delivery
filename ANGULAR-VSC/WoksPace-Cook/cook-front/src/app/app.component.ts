import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { ConnectivityService } from './services/connectivity.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Sistema de Gestión de Clientes';
  isOnline = true;
  private connectivitySubscription?: Subscription;

  constructor(
    private readonly authService: AuthService,
    private readonly connectivityService: ConnectivityService
  ) { }

  ngOnInit(): void {
    this.connectivitySubscription = this.connectivityService
      .isOnline()
      .subscribe(online => this.isOnline = online);
  }

  ngOnDestroy(): void {
    if (this.connectivitySubscription) {
      this.connectivitySubscription.unsubscribe();
    }
    this.authService.destroySession();
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  logout(): void {
    this.authService.logout();
  }
}