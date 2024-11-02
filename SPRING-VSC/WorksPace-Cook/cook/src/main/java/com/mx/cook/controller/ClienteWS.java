package com.mx.cook.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
    ClienteService service;

    @Autowired
    ClienteServiceImp imp;

    @GetMapping("listar")
    public List<Cliente> listarCliente() {
        return service.listar();
    }

    @PostMapping("buscar")
    public Cliente buscarCliente(@RequestBody Cliente cliente) {
        return service.buscar(cliente);
    }

    @PostMapping("guardar")
    public void guardarCliente(@RequestBody Cliente cliente) {
        service.guardar(cliente);
    }

    @PostMapping("editar")
    public void editarCliente(@RequestBody Cliente cliente) {
        service.editar(cliente);
    }

    @PostMapping("eliminar")
    public void eliminarCliente(@RequestBody Cliente cliente) {
        service.eliminar(cliente);
    }

}
