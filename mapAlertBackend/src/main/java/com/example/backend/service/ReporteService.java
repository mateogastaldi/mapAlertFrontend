package com.example.backend.service;

import java.util.List;



import com.example.backend.dto.ReporteDTO;
import com.example.backend.entity.Reporte;


public interface ReporteService {

    Reporte crearReporte(ReporteDTO dto);

    List<Reporte> listarReportes();
}
