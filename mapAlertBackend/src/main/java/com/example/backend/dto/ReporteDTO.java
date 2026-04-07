package com.example.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import jakarta.validation.constraints.Min;

import com.example.backend.enums.TipoReporte;

public class ReporteDTO {
//uso validaciones aca para evitar desde el principio datos incorrectos
    @NotBlank(message = "La latitud es obligatoria")
    private String latitud;

    @NotBlank(message = "La longitud es obligatoria")
    private String longitud;


    private String calle;

    @Min(value = 0, message = "El número de calle no puede ser negativo")
    private Integer numeroCalle;

    @NotBlank(message = "La ciudad es obligatoria")
    private String ciudad;

    @NotBlank(message = "La provincia es obligatoria")
    private String provincia;

    @NotBlank(message = "El país es obligatorio")
    private String pais;

    @NotNull(message = "El tipo de reporte es obligatorio")
    private TipoReporte tipoReporte;

    @Size(max = 500, message = "La descripción no puede superar los 500 caracteres")
    private String descripcion;

    // Getters y Setters

    public String getLatitud() {
        return latitud;
    }
    public void setLatitud(String latitud) {
        this.latitud = latitud;
    }
    public String getLongitud() {
        return longitud;
    }
    public void setLongitud(String longitud) {
        this.longitud = longitud;
    }
    public String getCalle() {
        return calle;
    }
    public void setCalle(String calle) {
        this.calle = calle;
    }
    public Integer getNumeroCalle() {
        return numeroCalle;
    }
    public void setNumeroCalle(Integer numeroCalle) {
        this.numeroCalle = numeroCalle;
    }
    public String getCiudad() {
        return ciudad;
    }
    public void setCiudad(String ciudad) {
        this.ciudad = ciudad;
    }
    public String getProvincia() {
        return provincia;
    }
    public void setProvincia(String provincia) {
        this.provincia = provincia;
    }
    public String getPais() {
        return pais;
    }
    public void setPais(String pais) {
        this.pais = pais;
    }
    public TipoReporte getTipoReporte() {
        return tipoReporte;
    }
    public void setTipoReporte(TipoReporte tipoReporte) {
        this.tipoReporte = tipoReporte;
    }
    public String getDescripcion() {
        return descripcion;
    }
    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }
}
