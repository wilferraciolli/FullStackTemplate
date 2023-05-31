package com.template.security.authentication;

import static org.springframework.http.HttpStatus.OK;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.template.libraries.rest.BaseRestService;
import com.template.security.jwt.refresh.RefreshTokenException;
import com.template.security.jwt.refresh.RefreshTokenRequest;


/**
 * The type Auth controller.
 */
@CrossOrigin
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

    @GetMapping("/accountverification/{userId}")
    public ResponseEntity<Void> verifyAccount(@PathVariable("userId") final Long userId) {
        this.authenticateService.verifyAccount(userId);

        return ResponseEntity.ok().build();
    }

    @PostMapping("/refresh/token")
    public ResponseEntity<AuthenticationResourceResponse> register(  HttpServletRequest request,
                                                                     HttpServletResponse response) throws RefreshTokenException {

        return ResponseEntity.status(OK)
                .body(this.authenticateService.refreshToken(request, response));
    }

}
