package com.mx.cook.dto;

import java.math.BigDecimal;

import lombok.Data;

@Data
public class ProductoDTO {
    private int idProducto;
    private String nombre;
    private String descripcion;
    private BigDecimal precio;
    private String imagen;
    private boolean disponible;
    private CategoriaDTO categoria;

    @Data
    public static class CategoriaDTO {
        private int idCategoria;
        private String nombre;
        private String descripcion;
    }
}
