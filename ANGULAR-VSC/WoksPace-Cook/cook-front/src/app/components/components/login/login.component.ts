import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { LoginRequest } from '../../../models/auth';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Subject, takeUntil } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,  // Importante para [routerLink]
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressBarModule,
    MatIconModule  // Importante para mat-icon
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  credentials: LoginRequest = {
    username: '',
    password: ''
  };
  loading = false;
  errorMessage = '';
  private readonly destroy$ = new Subject<void>();

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/clientes';
    this.authService.setRedirectUrl(returnUrl);

    if (this.authService.isAuthenticated()) {
      this.router.navigate([this.authService.getRedirectUrl()]);
    }
  }

  onSubmit(): void {
    if (!this.credentials.username || !this.credentials.password) {
      this.errorMessage = 'Por favor, complete todos los campos';
      this.showError('Por favor, complete todos los campos');
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    this.authService.login(this.credentials)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          if (response.exito) {
            this.loading = false;
          } else {
            this.showError('Credenciales inválidas');
            this.loading = false;
          }
        },
        error: (error) => {
          console.error('Error de login:', error);
          this.showError('Error al iniciar sesión');
          this.loading = false;
        }
      });
  }

  private showError(message: string): void {
    this.errorMessage = message;
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}