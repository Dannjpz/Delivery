package com.mx.cook.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mx.cook.modelo.Usuario;

public interface UsuarioDao extends JpaRepository<Usuario, Integer> {

    Optional<Usuario> findByUsername(String username);

}
