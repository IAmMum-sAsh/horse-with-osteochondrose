package ru.mirea.horseWithOsteochondrose.entitys;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "refresh_tokens")
@Data
@NoArgsConstructor
public class RefreshToken {
    /**
     * The Refresh token.
     */
    @Id
    @Column(name = "refresh_token")
    protected String refresh_token;

    /**
     * The User id.
     */
    @Column(name = "user_id")
    protected long user_id;

    public RefreshToken(long userId, String refreshToken) {
        this.user_id = userId;
        this.refresh_token = refreshToken;
    }

}