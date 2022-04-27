package ru.mirea.horseWithOsteochondrose.security.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class JwtAuthDto {
    private String email;
    private String accessToken;
    private String refreshToken;
    private String role;
    private String name;
    private long id;

    JwtAuthDto(String email, String accessToken, String refreshToken){
        this.email = email;
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }
}