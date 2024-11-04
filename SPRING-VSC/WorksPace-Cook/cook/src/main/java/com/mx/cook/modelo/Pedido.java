package com.mx.cook.modelo;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.mx.cook.constantes.EstadoPedido;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "PEDIDO")
@Getter
@Setter
@NoArgsConstructor
public class Pedido {
    @Id
    @Column(name = "IDPEDIDO")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "pedido_seq")
    @SequenceGenerator(name = "pedido_seq", sequenceName = "SEQ_PEDIDO", allocationSize = 1)
    private int idPedido;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CLIENTE_ID")
    private Cliente cliente;

    @Column(name = "FECHA_PEDIDO")
    private LocalDateTime fechaPedido;

    @Enumerated(EnumType.STRING)
    @Column(name = "ESTADO", length = 20)
    private EstadoPedido estado;

    @Column(name = "DIRECCION_ENTREGA", length = 500)
    private String direccionEntrega;

    @Column(name = "TOTAL", precision = 10, scale = 2)
    private BigDecimal total;

    @OneToMany(mappedBy = "pedido", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<DetallePedido> detalles = new ArrayList<>();
}
