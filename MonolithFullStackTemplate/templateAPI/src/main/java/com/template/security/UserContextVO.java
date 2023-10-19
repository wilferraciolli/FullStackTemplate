package com.template.security;

import java.util.List;

public record UserContextVO(
        Long id,
        Long personId,
        String firstName,
        String lastName,
        String username,
        Boolean active,
        List<String> userRoles) {
}
