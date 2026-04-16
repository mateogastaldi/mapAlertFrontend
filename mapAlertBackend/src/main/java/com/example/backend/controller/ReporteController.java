package com.example.backend.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.backend.dto.ReporteDTO;
import com.example.backend.entity.Reporte;
import com.example.backend.repository.ReporteRepository;
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

    @PostMapping("/crear")
    public ResponseEntity<ReporteDTO> crearReporte(
            @Valid @RequestBody ReporteDTO dto) {

        ReporteDTO reporte = reporteService.crearReporte(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(reporte);
    }

    @GetMapping("/bounds")
    public ResponseEntity<List<ReporteDTO>> listarReportes(
            @RequestParam Double southLat,
            @RequestParam Double northLat,
            @RequestParam Double westLng,
            @RequestParam Double eastLng){
        List<Reporte> reports = reporteService.getReportsByBounds(southLat, westLng, northLat, eastLng);
        List<ReporteDTO> dtos = reports.stream()
            .map(r -> new ReporteDTO(/* mapear campos */))
            .collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    
}
