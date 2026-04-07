package com.example.backend.dto;

public class HealthDTO {

    private String status;
    private String message;

    public HealthDTO(String status, String message) {
        this.status = status;
        this.message = message;
    }

    public String getStatus() {
        return status;
    }

    public String getMessage() {
        return message;
    }
}
