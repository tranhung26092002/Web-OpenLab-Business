package edu.ptit.openlab.DTO;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.Getter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class RegisterRequestDTO {
    private String username;
    private String email;
    private String password;
    private String role;
}

