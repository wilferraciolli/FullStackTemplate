package com.template.security.jwt.refresh;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * The interface Refresh token repository.
 */
@Repository
@Deprecated
public interface RefreshTokenRepositoryDeprecated extends JpaRepository<RefreshTokenDeprecated, Long> {

    /**
     * Find by refresh token optional.
     * @param refreshToken the refresh token
     * @return the optional
     */
    Optional<RefreshTokenDeprecated> findByRefreshToken(String refreshToken);

    /**
     * Find by username optional.
     * @param username the username
     * @return the optional
     */
    @Deprecated
    Optional<RefreshTokenDeprecated> findByUsername(String username);

    /**
     * Find by user id optional.
     * @param userId the user id
     * @return the optional
     */
    Optional<RefreshTokenDeprecated> findByUserId(Long userId);

    /**
     * Delete by refresh token.
     * @param refreshToken the refresh token
     */
    void deleteByRefreshToken(String refreshToken);
}
