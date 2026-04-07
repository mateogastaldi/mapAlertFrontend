package com.example.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.backend.entity.Reporte;

@Repository
public interface ReporteRepository extends JpaRepository<Reporte, Long> {
    // por ahora nada más
    //con esto ya puedo hacer save, findAll, findById, deleteById, etc
}
