package com.mx.cook.modelo;

import java.math.BigDecimal;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "DETALLEPEDIDO")
@Getter
@Setter
@NoArgsConstructor
public class DetallePedido {
    @Id
    @Column(name = "IDDETALLEPEDIDO")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "detalle_pedido_seq")
    @SequenceGenerator(name = "detalle_pedido_seq", sequenceName = "SEQ_DETALLE_PEDIDO", allocationSize = 1)
    private int idDetallePedido;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "PEDIDO_ID")
    private Pedido pedido;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "PRODUCTO_ID")
    private Producto producto;

    @Column(name = "CANTIDAD", precision = 5)
    private Integer cantidad;

    @Column(name = "PRECIO_UNITARIO", precision = 10, scale = 2)
    private BigDecimal precioUnitario;

    @Column(name = "SUBTOTAL", precision = 10, scale = 2)
    private BigDecimal subtotal;
}
