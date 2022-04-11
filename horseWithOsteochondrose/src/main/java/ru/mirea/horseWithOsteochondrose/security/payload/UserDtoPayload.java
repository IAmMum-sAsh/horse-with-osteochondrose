package ru.mirea.horseWithOsteochondrose.security.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDtoPayload extends BasicPayload{
    protected String username;
    protected String email;
    protected String password;
    protected String polis;
}
