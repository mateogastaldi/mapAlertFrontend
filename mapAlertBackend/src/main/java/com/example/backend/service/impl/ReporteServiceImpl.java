package com.example.backend.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.backend.dto.ReporteDTO;
import com.example.backend.entity.Reporte;
import com.example.backend.repository.ReporteRepository;
import com.example.backend.service.ReporteService;

@Service
public class ReporteServiceImpl implements ReporteService {

    private final ReporteRepository reporteRepository;

    public ReporteServiceImpl(ReporteRepository reporteRepository) {
        this.reporteRepository = reporteRepository;
    }

    @Override
    public Reporte crearReporte(ReporteDTO dto) {
        Reporte reporte = new Reporte();

        reporte.setLatitud(dto.getLatitud());
        reporte.setLongitud(dto.getLongitud());
        reporte.setCalle(dto.getCalle());
        reporte.setNumeroCalle(dto.getNumeroCalle());
        reporte.setCiudad(dto.getCiudad());
        reporte.setProvincia(dto.getProvincia());
        reporte.setPais(dto.getPais());
        reporte.setTipoReporte(dto.getTipoReporte());
        reporte.setDescripcion(dto.getDescripcion());

        return reporteRepository.save(reporte);
    }

    @Override
    public List<Reporte> listarReportes() {
        return reporteRepository.findAll();
    }
}
