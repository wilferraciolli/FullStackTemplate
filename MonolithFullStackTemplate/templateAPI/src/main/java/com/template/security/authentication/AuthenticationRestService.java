package com.template.security.authentication;

import static org.springframework.http.HttpStatus.OK;

import com.template.security.jwt.refresh.RefreshTokenRequest;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.template.libraries.rest.BaseRestService;
import com.template.security.jwt.refresh.RefreshTokenException;


/**
 * The type Auth controller.
 */
//@CrossOrigin
@RestController
@RequestMapping("/auth")
public class AuthenticationRestService extends BaseRestService {

    @Autowired
    private AuthenticationService authenticateService;

    @PostMapping("/register")
    public ResponseEntity<Void> register(@RequestBody @Valid final RegistrationRequest data) {
        this.authenticateService.register(data);

        return ResponseEntity.ok().build();
    }

    /**
     * Signin response entity.
     * @param data the data
     * @return the response entity
     */
    @PostMapping("/signin")
    public ResponseEntity<AuthenticationResourceResponse> signIn(@RequestBody @Valid final AuthenticationRequest data) {
        return ResponseEntity.status(OK)
                .body(this.authenticateService.authenticate(data));
    }

    @PutMapping("/accountverification/{userId}")
    public ResponseEntity<Void> verifyAccount(@PathVariable("userId") final Long userId) {
        this.authenticateService.verifyAccount(userId);

        return ResponseEntity.ok().build();
    }

    @PostMapping("/refresh/token")
    public ResponseEntity<AuthenticationResourceResponse> refreshToken(@RequestBody RefreshTokenRequest refreshTokenRequest) throws RefreshTokenException {
        return ResponseEntity.status(OK)
                .body(this.authenticateService.refreshToken(refreshTokenRequest));
    }

}
