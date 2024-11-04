package com.mx.cook.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mx.cook.dto.ProductoDTO;
import com.mx.cook.service.ProductoService;

@RestController
@RequestMapping("api/productos")
@CrossOrigin
public class ProductoController {

    @Autowired
    private ProductoService productoService;

    @GetMapping("/listarProducto")
    public ResponseEntity<List<ProductoDTO>> listar() {
        return ResponseEntity.ok(productoService.listarProducto());
    }

    @GetMapping("/productodisponibles")
    public ResponseEntity<List<ProductoDTO>> listarDisponibles() {
        return ResponseEntity.ok(productoService.listarProductoDisponibles());
    }

    @GetMapping("/listarProductoCategoria/{id}")
    public ResponseEntity<List<ProductoDTO>> listarPorCategoria(@PathVariable int id) {
        return ResponseEntity.ok(productoService.listarProductoPorCategoria(id));
    }

    @GetMapping("/buscarProducto/{id}")
    public ResponseEntity<ProductoDTO> buscar(@PathVariable int id) {
        try {
            return ResponseEntity.ok(productoService.buscarProducto(id));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/guardarProducto")
    public ResponseEntity<Void> guardar(@RequestBody ProductoDTO producto) {
        try {
            productoService.guardarProducto(producto);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/editarProducto")
    public ResponseEntity<Void> editar(@RequestBody ProductoDTO producto) {
        try {
            productoService.editarProducto(producto);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/eliminarProducto/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable int id) {
        try {
            productoService.eliminarProducto(id);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
