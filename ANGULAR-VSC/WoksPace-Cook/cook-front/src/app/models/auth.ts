export interface LoginRequest {
    username: string;
    password: string;
}

export interface AuthResponse {
    mensaje: string;
    exito: boolean;
    token?: string;  // Opcional porque el registro no devuelve token
}