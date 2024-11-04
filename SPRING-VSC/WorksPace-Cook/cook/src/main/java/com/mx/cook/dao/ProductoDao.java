package com.mx.cook.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mx.cook.modelo.Producto;

public interface ProductoDao extends JpaRepository<Producto, Integer> {

    List<Producto> findByCategoria_IdCategoria(int categoriaId);

    List<Producto> findByDisponibleTrue();

}
