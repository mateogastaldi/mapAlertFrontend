package com.example.backend.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.example.backend.exceptions.reportes.*;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(ReporteNotSaveException.class)
    public ResponseEntity<String> handleReporteNotSave(ReporteNotSaveException ex){
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ex.getMessage());
    }
}
