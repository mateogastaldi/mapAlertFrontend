package com.example.backend.service;

import com.example.backend.dto.LoginDTO;
import com.example.backend.dto.UsuarioRegistroDTO;
import com.example.backend.entity.Usuario;

public interface UsuarioService {
    Usuario crearUsuario(UsuarioRegistroDTO dto);
    Usuario login(LoginDTO dto);
}



