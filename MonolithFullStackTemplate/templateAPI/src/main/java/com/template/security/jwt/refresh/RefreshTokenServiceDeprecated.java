package com.template.security.jwt.refresh;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.UUID;

/**
 * Service to create and manage refresh tokens.
 */
@Service
@Transactional
@Slf4j
@Deprecated
public class RefreshTokenServiceDeprecated {

    @Autowired
    private RefreshTokenRepository refreshTokenRepository;

    public String generateRefreshToken(final Long userId, final String userName) {

        final RefreshTokenDeprecated refreshTokenDeprecated = refreshTokenRepository.findByUserId(userId)
                .map(token -> updateRefreshToken(token))
                .orElseGet(() -> createRefreshToken(userId, userName));

        return refreshTokenDeprecated.getRefreshToken();
    }

    private RefreshTokenDeprecated updateRefreshToken(final RefreshTokenDeprecated token) {
        token.updateToken();
        refreshTokenRepository.save(token);

        return token;
    }

    private RefreshTokenDeprecated createRefreshToken(final Long userId, final String userName) {

        return refreshTokenRepository.save(RefreshTokenDeprecated.builder()
                .refreshToken(UUID.randomUUID().toString())
                .userId(userId)
                .username(userName)
                .createdDate(Instant.now())
                .build());
    }

    void validateRefreshToken(final String token) throws RefreshTokenException {

        refreshTokenRepository.findByRefreshToken(token)
                .orElseThrow(() -> new RefreshTokenException("Invalid refresh Token"));
    }

    public void deleteRefreshToken(final String token) {
        refreshTokenRepository.deleteByRefreshToken(token);
    }

    public void deleteRefreshTokenByUserId(final Long userId) {
        refreshTokenRepository.findByUserId(userId)
                .ifPresentOrElse(token -> refreshTokenRepository.deleteByRefreshToken(token.getRefreshToken()),
                        () -> log.info(String.format("Could not delete refresh token for user %s", userId)));
    }

    public RefreshTokenDeprecated loadRefreshToken(final String refreshToken) throws RefreshTokenException {

        return refreshTokenRepository.findByRefreshToken(refreshToken)
                .orElseThrow(() -> new RefreshTokenException("Could not load refresh token " + refreshToken));
    }
}
