package com.example.backend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.backend.dto.ReporteDTO;
import com.example.backend.entity.Reporte;
import com.example.backend.service.ReporteService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/reportes")
@CrossOrigin // después lo ajustamos
public class ReporteController {

    private final ReporteService reporteService;

    public ReporteController(ReporteService reporteService) {
        this.reporteService = reporteService;
    }

    @PostMapping
    public ResponseEntity<Reporte> crearReporte(
            @Valid @RequestBody ReporteDTO dto) {

        Reporte reporte = reporteService.crearReporte(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(reporte);
    }

    @GetMapping
    public ResponseEntity<List<Reporte>> listarReportes() {
        return ResponseEntity.ok(reporteService.listarReportes());
    }
}
