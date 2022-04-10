package ru.mirea.horseWithOsteochondrose.security.payload;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserDtoPayload extends BasicPayload{
    protected String username;
    protected String email;
    protected String password;

    public UserDtoPayload(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }
}
