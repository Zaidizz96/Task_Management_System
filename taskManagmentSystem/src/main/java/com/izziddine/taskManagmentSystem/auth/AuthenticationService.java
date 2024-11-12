package com.izziddine.taskManagmentSystem.auth;

import com.izziddine.taskManagmentSystem.config.JwtService;
import com.izziddine.taskManagmentSystem.entities.User;
import com.izziddine.taskManagmentSystem.enums.Role;
import com.izziddine.taskManagmentSystem.errors.exceptions.InvalidCredentialException;
import com.izziddine.taskManagmentSystem.errors.exceptions.UserAlreadyExistsException;
import com.izziddine.taskManagmentSystem.repository.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtService userService, JwtService jwtService, AuthenticationManager authenticationManager, UserDetailsService userDetailsService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;

        this.authenticationManager = authenticationManager;
    }

    public AuthenticationResponse register(RegisterRequest registerRequest) {

        if (userRepository.findByEmail(registerRequest.getEmail()).isPresent()) {
            throw new UserAlreadyExistsException("User already exists");
        }
        User user = new User();
        user.setName(registerRequest.getName());
        user.setEmail(registerRequest.getEmail());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        user.setRole(registerRequest.getRole());
        if (registerRequest.getActive() != null) {
            user.setActive(registerRequest.getActive());
        }else {
            user.setActive(true);
        }
        userRepository.save(user);


        String jwt = jwtService.generateToken(user);

        AuthenticationResponse authenticationResponse = new AuthenticationResponse();
        authenticationResponse.setToken(jwt);
        return authenticationResponse;

    }

    public AuthenticationResponse authenticate(AuthenticationRequest authenticationRequest) {

        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(), authenticationRequest.getPassword()));

            User user = userRepository.findByEmail(authenticationRequest.getUsername()).orElseThrow(() -> new InvalidCredentialException("Invalid email or password"));
            String jwt = jwtService.generateToken(user);

            AuthenticationResponse authenticationResponse = new AuthenticationResponse();
            authenticationResponse.setToken(jwt);
            return authenticationResponse;
        } catch (RuntimeException e) {
            throw new InvalidCredentialException("Invalid email or password");
        }


    }
}
