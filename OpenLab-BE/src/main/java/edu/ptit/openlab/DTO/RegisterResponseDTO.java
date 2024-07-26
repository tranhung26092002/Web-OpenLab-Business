package edu.ptit.openlab.DTO;

import lombok.Data;

@Data
public class RegisterResponseDTO {
    private String email;
    private String password;

    public RegisterResponseDTO(String email, String password) {
        this.email = email;
        this.password = password;
    }
}
