package com.mx.cook.service;

import java.util.List;

import com.mx.cook.modelo.Categoria;

public interface CategoriaService {

    List<Categoria> listarCategoria();

    Categoria buscarCategoria(int id);

    void guardarCategoria(Categoria categoria);

    void editarCategoria(Categoria categoria);

    void eliminarCategoria(int id);

}
