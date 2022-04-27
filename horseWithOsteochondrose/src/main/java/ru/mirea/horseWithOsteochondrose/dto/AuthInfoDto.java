package ru.mirea.horseWithOsteochondrose.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthInfoDto {
    private String role;
    private String name;
    private long id;
}
