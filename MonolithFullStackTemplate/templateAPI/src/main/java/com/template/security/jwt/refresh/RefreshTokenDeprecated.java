package com.template.security.jwt.refresh;

import java.time.Instant;
import java.util.UUID;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "tp_refreshToken")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RefreshTokenDeprecated {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private Long userId;

    @NotEmpty
    private String username;

    @NotEmpty
    private String refreshToken;

    private Instant createdDate;

    public void updateToken() {
        this.createdDate = Instant.now();
        this.refreshToken = UUID.randomUUID().toString();
    }
}
