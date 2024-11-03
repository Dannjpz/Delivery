package com.mx.cook;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = "com.mx.cook")
public class CookApplication {

    public static void main(String[] args) {
        SpringApplication.run(CookApplication.class, args);
    }
}