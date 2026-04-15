package com.example.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.validation.constraints.Min;

import com.example.backend.enums.TipoReporte;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReporteDTO {
//uso validaciones aca para evitar desde el principio datos incorrectos
    @NotBlank(message = "La latitud es obligatoria")
    private String lat;

    @NotBlank(message = "La longitud es obligatoria")
    private String lng;


    private String street;

    @Min(value = 0, message = "El número de calle no puede ser negativo")
    private Integer streetNumber;

    @NotBlank(message = "La ciudad es obligatoria")
    private String city;

    @NotBlank(message = "La provincia es obligatoria")
    private String state;

    @NotBlank(message = "El país es obligatorio")
    private String country;

    @NotNull(message = "El tipo de reporte es obligatorio")
    private TipoReporte reportType;

    @Size(max = 500, message = "La descripción no puede superar los 500 caracteres")
    private String reportDescription;

}
