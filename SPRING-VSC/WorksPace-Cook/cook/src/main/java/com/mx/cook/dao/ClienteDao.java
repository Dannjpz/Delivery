package com.mx.cook.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mx.cook.modelo.Cliente;

public interface ClienteDao extends JpaRepository<Cliente, Integer> {

}
