package edu.ptit.openlab.filter;

import edu.ptit.openlab.DTO.AuthenticationResponse;
import edu.ptit.openlab.entity.User;
import edu.ptit.openlab.repository.UserRepository;
import edu.ptit.openlab.service.AuthenticationService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import org.springframework.security.core.AuthenticationException;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;

public class JWTAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    @Autowired
    private UserRepository userRepository;

    private final AuthenticationService authenticationService;
    private final AuthenticationManager authenticationManager;

    public JWTAuthenticationFilter(AuthenticationManager authenticationManager,AuthenticationService authenticationService){
        this.authenticationManager = authenticationManager;
        this.authenticationService = authenticationService;
        setAuthenticationManager(authenticationManager);
    }
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException{
        try {
            User userCredentials = new ObjectMapper().readValue(request.getInputStream(), User.class);
            return getAuthenticationManager().authenticate(
                    new UsernamePasswordAuthenticationToken(
                            userCredentials.getEmail(),
                            userCredentials.getPassword(),
                            new ArrayList<>())

            );
        } catch(IOException e) {
            throw new RuntimeException("Error reading the request's input stream", e);
        }
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {
        AuthenticationResponse authResponse = authenticationService.login(((org.springframework.security.core.userdetails.User) authResult.getPrincipal()).getUsername(), ((User) authResult.getCredentials()).getPassword());

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write(new ObjectMapper().writeValueAsString(authResponse));
    }
}