package com.template.security.authentication;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonRootName;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.Value;

/**
 * The type Authentication request.
 */
@JsonRootName("authentication")
@Builder
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Getter
@EqualsAndHashCode
@ToString
public class AuthenticationRequest implements Serializable {

    private String username;
    private String password;
}
