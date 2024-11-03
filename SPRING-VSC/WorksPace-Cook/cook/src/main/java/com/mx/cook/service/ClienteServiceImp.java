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
    ClienteDao clienteDao;

    @Override
    public List<Cliente> listar() {

        return clienteDao.findAll(Sort.by(Sort.Direction.ASC, "idCliente"));

    }

    @Override
    public Cliente buscar(Cliente cliente) {

        return clienteDao.findById(cliente.getIdCliente()).orElse(null);

    }

    @Override
    public void editar(Cliente cliente) {
        clienteDao.save(cliente);
    }

    @Override
    public void guardar(Cliente cliente) {
        clienteDao.save(cliente);
    }

    @Override
    public void eliminar(Cliente cliente) {
        clienteDao.delete(cliente);
    }

}
