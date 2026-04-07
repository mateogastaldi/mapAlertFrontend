package com.example.backend.service.impl;

import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.example.backend.dto.LoginDTO;
import com.example.backend.dto.UsuarioRegistroDTO;
import com.example.backend.entity.Usuario;
import com.example.backend.repository.UsuarioRepository;
import com.example.backend.service.UsuarioService;

@Service
public class UsuarioServiceImpl implements UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    public UsuarioServiceImpl(
            UsuarioRepository usuarioRepository,
            PasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public Usuario crearUsuario(UsuarioRegistroDTO dto) {

        // validar usuario duplicado
        if (usuarioRepository.existsByUsuario(dto.getUsuario())) {
            throw new RuntimeException("El nombre de usuario ya existe");
        }

        // validar email duplicado
        if (usuarioRepository.existsByEmail(dto.getEmail())) {
            throw new RuntimeException("El email ya está registrado");
        }

        Usuario usuario = new Usuario();
        usuario.setUsuario(dto.getUsuario());
        usuario.setContrasena(passwordEncoder.encode(dto.getContrasena()));
        usuario.setNombres(dto.getNombres());
        usuario.setApellidos(dto.getApellidos());
        usuario.setEmail(dto.getEmail());

        return usuarioRepository.save(usuario);
    }

    @Override
    public Usuario login(LoginDTO dto) {

        Optional<Usuario> usuarioOpt =
                usuarioRepository.findByUsuario(dto.getUsuario());

        if (usuarioOpt.isEmpty()) {
        throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Credenciales incorrectas");        }

        Usuario usuario = usuarioOpt.get();

        if (!passwordEncoder.matches(dto.getContrasena(), usuario.getContrasena())) {
            throw new RuntimeException("Usuario o contraseña incorrectos");
        }

        return usuario;
    }
}
