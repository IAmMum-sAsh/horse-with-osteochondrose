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
}