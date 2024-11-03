package com.mx.cook.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuthResponse {

    private String mensaje;
    private boolean exito;
    private String token;

    public AuthResponse(String mensaje, boolean exito, String token) {
        this.mensaje = mensaje;
        this.exito = exito;
        this.token = token;
    }

}
