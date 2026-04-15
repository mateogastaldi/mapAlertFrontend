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

        reporte.setLatitud(dto.getLat());
        reporte.setLongitud(dto.getLng());
        reporte.setCalle(dto.getStreet());
        reporte.setNumeroCalle(dto.getStreetNumber());
        reporte.setCiudad(dto.getCity());
        reporte.setProvincia(dto.getState());
        reporte.setPais(dto.getCountry());
        reporte.setTipoReporte(dto.getReportType());
        reporte.setDescripcion(dto.getReportDescription());

        return reporteRepository.save(reporte);
    }

    @Override
    public List<Reporte> listarReportes() {
        return reporteRepository.findAll();
    }

    public List<Reporte> getReportsByBounds(Double southLat, Double westLng, Double northLat, Double eastLng){
        return reporteRepository.findByBounds(southLat, northLat, westLng, eastLng);
        
    }
}
