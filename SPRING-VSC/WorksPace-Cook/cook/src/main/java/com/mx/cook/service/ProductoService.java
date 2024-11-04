package com.mx.cook.service;

import java.util.List;

import com.mx.cook.dto.ProductoDTO;

public interface ProductoService {

    List<ProductoDTO> listarProducto();

    List<ProductoDTO> listarProductoDisponibles();

    List<ProductoDTO> listarProductoPorCategoria(int categoriaId);

    ProductoDTO buscarProducto(int id);

    void guardarProducto(ProductoDTO productoDTO);

    void editarProducto(ProductoDTO productoDTO);

    void eliminarProducto(int id);

}
