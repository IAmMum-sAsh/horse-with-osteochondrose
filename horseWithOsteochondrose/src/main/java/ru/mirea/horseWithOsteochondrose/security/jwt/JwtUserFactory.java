package ru.mirea.horseWithOsteochondrose.security.jwt;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import ru.mirea.horseWithOsteochondrose.entitys.User;

public class JwtUserFactory {
    public static JwtUser create(User user) {
        return new JwtUser(
                user.getEmail(),
                user.getPassword(),
                new SimpleGrantedAuthority(user.getRole()));
    }
}