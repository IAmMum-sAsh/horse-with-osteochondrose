package ru.mirea.horseWithOsteochondrose.security.dto;

import lombok.Data;

@Data
public class AuthenticationRequestDto {
    private String email;
    private String password;
}