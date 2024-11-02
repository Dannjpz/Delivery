package com.mx.cook.modelo;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "CLIENTE")
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Getter
@Setter

public class Cliente {

    @Id
    @Column(name = "IDCLIENTE")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "cliente_seq")
    @SequenceGenerator(name = "cliente_seq", sequenceName = "SEQ_CLIENTE", allocationSize = 1)
    private int idCliente;
    @Column
    private String nombre;

}
