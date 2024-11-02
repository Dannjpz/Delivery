package com.mx.cook.service;

import java.util.List;

import com.mx.cook.modelo.Cliente;

public interface ClienteService {

    public List<Cliente> listar();

    public Cliente buscar(Cliente cliente);

    public void editar(Cliente cliente);

    public void guardar(Cliente cliente);

    public void eliminar(Cliente cliente);

}
