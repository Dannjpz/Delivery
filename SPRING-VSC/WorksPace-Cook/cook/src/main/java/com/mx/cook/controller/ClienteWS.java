package com.mx.cook.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mx.cook.dao.ClienteDao;
import com.mx.cook.modelo.Cliente;
import com.mx.cook.service.ClienteService;
import com.mx.cook.service.ClienteServiceImp;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RequestMapping(path = "api/Cliente")
@RestController
@CrossOrigin

public class ClienteWS {

    @Autowired
    ClienteService clienteService;

    @Autowired
    ClienteServiceImp clienteServiceImp;

    @Autowired
    ClienteDao clienteDao;

    @GetMapping("listar")
    public List<Cliente> listarCliente() {
        return clienteService.listar();
    }

    @PostMapping("buscar")
    public Cliente buscarCliente(@RequestBody Cliente cliente) {
        return clienteService.buscar(cliente);
    }

    @PostMapping("guardar")
    public void guardarCliente(@RequestBody Cliente cliente) {
        clienteService.guardar(cliente);
    }

    @PostMapping("editar")
    public void editarCliente(@RequestBody Cliente cliente) {
        clienteService.editar(cliente);
    }

    @PostMapping("eliminar")
    public void eliminarCliente(@RequestBody Cliente cliente) {
        clienteService.eliminar(cliente);
    }

}
