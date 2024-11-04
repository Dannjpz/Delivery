package com.mx.cook.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mx.cook.dao.CategoriaDao;
import com.mx.cook.dao.ProductoDao;
import com.mx.cook.dto.ProductoDTO;
import com.mx.cook.exception.ProductoNotFoundException;
import com.mx.cook.modelo.Categoria;
import com.mx.cook.modelo.Producto;

@Service
public class ProductoServiceImp implements ProductoService {

    @Autowired
    private ProductoDao productoDao;

    @Autowired
    private CategoriaDao categoriaDao;

    @Override
    @Transactional(readOnly = true)
    public List<ProductoDTO> listarProducto() {
        return productoDao.findAll().stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProductoDTO> listarProductoDisponibles() {
        return productoDao.findByDisponibleTrue().stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProductoDTO> listarProductoPorCategoria(int categoriaId) {
        return productoDao.findByCategoria_IdCategoria(categoriaId).stream().map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public ProductoDTO buscarProducto(int id) {
        Producto producto = productoDao.findById(id)
                .orElseThrow(() -> new ProductoNotFoundException("Producto no encontrado con ID: " + id));
        return convertToDTO(producto);
    }

    @Override
    @Transactional
    public void guardarProducto(ProductoDTO productoDTO) {
        Producto producto = convertToEntity(productoDTO);
        productoDao.save(producto);
    }

    @Override
    @Transactional
    public void editarProducto(ProductoDTO productoDTO) {
        if (!productoDao.existsById(productoDTO.getIdProducto())) {
            throw new ProductoNotFoundException("Producto no encontrado con ID: " + productoDTO.getIdProducto());
        }
        Producto producto = convertToEntity(productoDTO);
        productoDao.save(producto);
    }

    @Override
    @Transactional
    public void eliminarProducto(int id) {
        if (!productoDao.existsById(id)) {
            throw new ProductoNotFoundException("Producto no encontrado con ID: " + id);
        }
        productoDao.deleteById(id);
    }

    private ProductoDTO convertToDTO(Producto producto) {
        ProductoDTO dto = new ProductoDTO();
        dto.setIdProducto(producto.getIdProducto());
        dto.setNombre(producto.getNombre());
        dto.setDescripcion(producto.getDescripcion());
        dto.setPrecio(producto.getPrecio());
        dto.setImagen(producto.getImagen());
        dto.setDisponible(producto.isDisponible());

        if (producto.getCategoria() != null) {
            ProductoDTO.CategoriaDTO categoriaDTO = new ProductoDTO.CategoriaDTO();
            categoriaDTO.setIdCategoria(producto.getCategoria().getIdCategoria());
            categoriaDTO.setNombre(producto.getCategoria().getNombre());
            categoriaDTO.setDescripcion(producto.getCategoria().getDescripcion());
            dto.setCategoria(categoriaDTO);
        }

        return dto;
    }

    private Producto convertToEntity(ProductoDTO dto) {
        Producto producto = new Producto();
        producto.setIdProducto(dto.getIdProducto());
        producto.setNombre(dto.getNombre());
        producto.setDescripcion(dto.getDescripcion());
        producto.setPrecio(dto.getPrecio());
        producto.setImagen(dto.getImagen());
        producto.setDisponible(dto.isDisponible());

        if (dto.getCategoria() != null) {
            Categoria categoria = categoriaDao.findById(dto.getCategoria().getIdCategoria())
                    .orElseThrow(() -> new RuntimeException("Categoría no encontrada"));
            producto.setCategoria(categoria);
        }

        return producto;
    }

}