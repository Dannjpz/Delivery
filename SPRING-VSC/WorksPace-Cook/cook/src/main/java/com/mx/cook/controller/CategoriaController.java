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

import com.mx.cook.modelo.Categoria;
import com.mx.cook.service.CategoriaService;

@RestController
@RequestMapping("api/categorias")
@CrossOrigin
public class CategoriaController {

    @Autowired
    private CategoriaService categoriaService;

    @GetMapping("/listarCategoria")
    public ResponseEntity<List<Categoria>> listarCategoria() {
        return ResponseEntity.ok(categoriaService.listarCategoria());
    }

    @GetMapping("/buscarCategoria/{id}")
    public ResponseEntity<Categoria> buscarCategoria(@PathVariable int id) {
        try {
            return ResponseEntity.ok(categoriaService.buscarCategoria(id));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/guardarCategoria")
    public ResponseEntity<Void> guardarCategoria(@RequestBody Categoria categoria) {
        try {
            categoriaService.guardarCategoria(categoria);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/editarCategoria")
    public ResponseEntity<Void> editarCategoria(@RequestBody Categoria categoria) {
        try {
            categoriaService.editarCategoria(categoria);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/eliminarCategoria/{id}")
    public ResponseEntity<Void> eliminarCategoria(@PathVariable int id) {
        try {
            categoriaService.eliminarCategoria(id);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}