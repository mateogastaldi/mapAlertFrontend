package com.example.backend.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.backend.dto.ReporteDTO;
import com.example.backend.entity.Reporte;
import com.example.backend.exceptions.reportes.ReporteNotSaveException;
import com.example.backend.repository.ReporteRepository;
import com.example.backend.service.ReporteService;

@Service
public class ReporteServiceImpl implements ReporteService {

    private final ReporteRepository reporteRepository;

    public ReporteServiceImpl(ReporteRepository reporteRepository) {
        this.reporteRepository = reporteRepository;
    }

    @Override
    public ReporteDTO crearReporte(ReporteDTO dto) {
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

        Reporte reporteGuardado;

        try{
            reporteGuardado = reporteRepository.save(reporte);
        } catch (Exception e){
            throw new ReporteNotSaveException(); 
        } 

        ReporteDTO reporteGuardadoDTO = new ReporteDTO().builder()
                                            .city(reporteGuardado.getCiudad())
                                            .country(reporteGuardado.getPais())
                                            .lat(reporteGuardado.getLatitud())
                                            .lng(reporteGuardado.getLongitud())
                                            .reportDescription(reporteGuardado.getDescripcion())
                                            .reportType(reporteGuardado.getTipoReporte())
                                            .state(reporteGuardado.getProvincia())
                                            .street(reporteGuardado.getCalle())
                                            .streetNumber(reporteGuardado.getNumeroCalle())
                                            .build();

        return reporteGuardadoDTO;
    }

    @Override
    public List<Reporte> listarReportes() {
        return reporteRepository.findAll();
    }

    public List<Reporte> getReportsByBounds(Double southLat, Double westLng, Double northLat, Double eastLng){
        return reporteRepository.findByBounds(southLat, northLat, westLng, eastLng);
        
    }
}
