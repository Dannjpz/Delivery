package com.mx.cook.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mx.cook.modelo.Categoria;

@Repository
public interface CategoriaDao extends JpaRepository<Categoria, Integer> {
}
