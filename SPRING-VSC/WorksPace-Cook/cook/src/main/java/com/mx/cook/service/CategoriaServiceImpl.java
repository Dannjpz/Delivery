package com.mx.cook.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mx.cook.dao.CategoriaDao;
import com.mx.cook.exception.CategoriaNotFoundException;
import com.mx.cook.modelo.Categoria;

@Service
public class CategoriaServiceImpl implements CategoriaService {
    private static final String CATEGORIA_NO_ENCONTRADA = "Categoría no encontrada con ID: ";

    @Autowired
    private CategoriaDao categoriaDao;

    @Override
    @Transactional(readOnly = true)
    public List<Categoria> listarCategoria() {
        return categoriaDao.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Categoria buscarCategoria(int id) {
        return categoriaDao.findById(id)
                .orElseThrow(() -> new CategoriaNotFoundException(CATEGORIA_NO_ENCONTRADA + id));
    }

    @Override
    @Transactional
    public void guardarCategoria(Categoria categoria) {
        categoriaDao.save(categoria);
    }

    @Override
    @Transactional
    public void editarCategoria(Categoria categoria) {
        if (!categoriaDao.existsById(categoria.getIdCategoria())) {
            throw new CategoriaNotFoundException(CATEGORIA_NO_ENCONTRADA + categoria.getIdCategoria());
        }
        categoriaDao.save(categoria);
    }

    @Override
    @Transactional
    public void eliminarCategoria(int id) {
        if (!categoriaDao.existsById(id)) {
            throw new CategoriaNotFoundException(CATEGORIA_NO_ENCONTRADA + id);
        }
        categoriaDao.deleteById(id);
    }
}