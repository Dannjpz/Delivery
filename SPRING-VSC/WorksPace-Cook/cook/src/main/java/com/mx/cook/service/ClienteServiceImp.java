package com.mx.cook.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.mx.cook.dao.ClienteDao;
import com.mx.cook.modelo.Cliente;

@Service
public class ClienteServiceImp implements ClienteService {

    @Autowired
    ClienteDao dao;

    @Override
    public List<Cliente> listar() {

        return dao.findAll(Sort.by(Sort.Direction.ASC, "idCliente"));

    }

    @Override
    public Cliente buscar(Cliente cliente) {

        return dao.findById(cliente.getIdCliente()).orElse(null);

    }

    @Override
    public void editar(Cliente cliente) {
        dao.save(cliente);
    }

    @Override
    public void guardar(Cliente cliente) {
        dao.save(cliente);
    }

    @Override
    public void eliminar(Cliente cliente) {
        dao.delete(cliente);
    }

}
