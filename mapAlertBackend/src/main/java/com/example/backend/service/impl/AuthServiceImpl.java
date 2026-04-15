package com.example.backend.service.impl;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.backend.dto.JwtResponseDTO;
import com.example.backend.dto.LoginRequestDTO;
import com.example.backend.dto.RegisterRequestDTO;
import com.example.backend.entity.Usuario;
import com.example.backend.enums.Rol;
import com.example.backend.repository.UsuarioRepository;
import com.example.backend.service.AuthService;
import com.example.backend.service.JwtService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UsuarioRepository usuarioRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;

    public JwtResponseDTO login(LoginRequestDTO request){
        return null;
    }

    public JwtResponseDTO register(RegisterRequestDTO request){
        Usuario user = Usuario.builder()
        .usuario(request.getUsername())
        .apellidos(request.getLastName())
        .contrasena(request.getPassword())
        .nombres(request.getFirstName())
        .rol(Rol.USER)
        .email(request.getEmail())
        .build();

        usuarioRepository.save(user);

        return JwtResponseDTO.builder()
                .token(jwtService.getToken(user))
                .build();
    }
    
}
